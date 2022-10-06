import React, { useEffect, useState } from "react";
import { storage, ref, uploadBytesResumable, getDownloadURL, updateUserImage } from "./firebase";
import $ from 'jquery';
import "./Profile.css";

export default function Profile({ currentUser, updateUserProfileImage, updateUserProfileInfo }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const allInputs = { imgUrl: '' };
    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState(allInputs);
    const [imageEvent, setImageEvent] = useState('');
    const [editMode, setEditMode] = useState(false);




    const toggleEditMode = (e) => {
        e.preventDefault();
        setEditMode(current => !current);
    }

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        console.log(e.target.files)
        setImageEvent(imageEvent => (e))
        setImageAsFile(imageFile => (image))
    }

    // updates database And state THEN resets input-bound-variables (empties inputs) + turns off edit mode
    const handleUserProfileUpdate = () => {
        updateUserProfileInfo(currentUser.dataID, name);
        setName('');

        setEditMode(false);
    }


    const handleFirebaseUpload = e => {
        if(e){

            console.log(e)
            e.preventDefault()
            if($('#error-image-format')){
                $('#error-image-format').remove()
            }
            console.log('start of upload')
            // check if no image
            if (imageAsFile === '') {
                const $btn = $(e.target);
                $btn.append('<p id="error-image-format" class="ml-2 mb-0 error-tag">Sorry, please try another image or format.</p>');
                console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
            }
            const metadata = {
                contentType: 'image/jpeg'
            };

            // Upload file and metadata to the object
            const storageRef = ref(storage, `profileImages/${currentUser.uid}/${imageAsFile}`);
            const uploadTask = uploadBytesResumable(storageRef, imageAsFile, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        updateUserProfileImage(currentUser.dataID, downloadURL);
                    });
                }
            );
        }

    }

    useEffect(() => {
        handleFirebaseUpload(imageEvent);
    }, [imageAsFile]);

    // useEffect(() => {

    // })
    const placeholderImage = 'https://firebasestorage.googleapis.com/v0/b/propertypulse.appspot.com/o/Portrait_Placeholder.png?alt=media&token=d0107aa8-8474-4017-b6ca-cba008fbda7e';
    return (
        <>
            <div className="tab-title-submenu d-flex justify-content-between align-items-center mx-5">
                <h1 className='mt-0'>Profile</h1>
                <ul className="submenu">
                    <li className="submenu-item">
                        <a onClick={toggleEditMode} href="">Edit profile</a>
                    </li>
                </ul>
            </div>
            <div className="edit-profile container h-100">
                <div className="card-container-full container card-container container-full p-4 row">
                    <div className="d-flex flex-column col-12 col-md-6">
                        <form className="" onSubmit={handleFirebaseUpload}>
                            <input
                                type="file"
                                onChange={handleImageAsFile}
                                className="d-none"
                                id="image-input"
                                disabled={!editMode}
                            />
                            <label htmlFor="image-input" className={editMode ? 'cursor-pointer' : ''}>
                                <div className="profile-image">
                                    <img src={currentUser.userImage ? currentUser.userImage : placeholderImage} className="" alt="" />
                                </div>
                            </label>
                            <button id="upload-image" className="col-4 btn-primary d-none">
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="d-flex flex-column col-12 col-md-6">
                        <input
                            type="text"
                            className="login__textBox"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={currentUser.name}
                            disabled={!editMode}
                        />
                        <input
                            type="text"
                            className="login__textBox"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={currentUser.email}
                            disabled={!editMode}
                        />
                        <button
                            className={editMode && name != '' ? 'login__btn' : 'd-none'}
                            onClick={handleUserProfileUpdate}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

import React, { useEffect, useState } from "react";
import { storage, ref, uploadBytesResumable, getDownloadURL, updateUserImage } from "./firebase";

export default function Profile({ currentUser }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const allInputs = { imgUrl: '' }
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        console.log(e.target.files)
        setImageAsFile(imageFile => (image))
    }


    const handleFirebaseUpload = e => {
        e.preventDefault()
        console.log('start of upload')
        // check if no image
        if (imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
        }
        const metadata = {
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object
        const storageRef = ref(storage, `${currentUser.uid}/${imageAsFile}`);
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
                    updateUserImage(currentUser.uid, downloadURL);
                });
            }
        );

    }

    console.log(currentUser)
    return (
        <>
            <h1 className='mt-0'>Profile</h1>
            <div className="edit-profile container h-100">
                <div className="edit-profile__container container card-container container-full p-4 d-flex">
                    <div className="d-flex flex-column w-50">
                        <div className="profile-image">
                            <img src="" alt="" />
                        </div>
                        <form onSubmit={handleFirebaseUpload}>
                            <input
                                type="file"
                                onChange={handleImageAsFile}
                            />
                            <button className="login__btn">
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="d-flex flex-column w-50">
                        <input
                            type="text"
                            className="login__textBox"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={currentUser.name}
                        />
                        <input
                            type="text"
                            className="login__textBox"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={currentUser.email}
                        />
                        <button
                            className="login__btn"
                        //   onClick={() => signInWithEmailAndPassword(email, password)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

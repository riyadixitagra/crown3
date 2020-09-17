import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = 
{
    apiKey: "AIzaSyD8cry4X6dHOLVBrHaKH9PvPCqygC8WcRE",
    authDomain: "crown-db-137f1.firebaseapp.com",
    databaseURL: "https://crown-db-137f1.firebaseio.com",
    projectId: "crown-db-137f1",
    storageBucket: "crown-db-137f1.appspot.com",
    messagingSenderId: "183125673282",
    appId: "1:183125673282:web:c16cf816c865950c95f4db",
    measurementId: "G-DRZX3YJEY2"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionlData) => {
    if(!userAuth)return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email}=userAuth;
        const createdAt= new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionlData
            });
        }catch(error){
            console.log('error creating user',error.message);
        }
    }
    return userRef;
}; 

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
    const collectionRef = firestore.collection(collectionKey);
    
    const batch= firestore.batch();
    objectsToAdd.forEach(obj =>{
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections)=>{
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return{
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });
}

export const auth = firebase.auth();
export const firestore=firebase.firestore();

const provider= new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle=()=>auth.signInWithPopup(provider);

export default firebase;
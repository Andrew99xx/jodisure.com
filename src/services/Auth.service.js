import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db, storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import randomize, {isCrypto} from 'randomatic';
import moment from "moment";

const usersCollection =collection(db, 'users');


export async function genUUID(uid) {
    const UUID = randomize('A0', 6); // Generates a random UUID
  
    // Query Firestore to check if this UUID already exists
    const q = query(usersCollection, where('UUID', '==', UUID));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      // If the UUID already exists, recursively call genUUID to generate a new one
      return genUUID(uid);
    } else {
      // If the UUID is unique, update the user's document with the new UUID
      const userDocRef = doc(usersCollection, uid);
      await updateDoc(userDocRef, { UUID });
      return UUID;
    }
  }


  async function getMyProfile(uid) {
    // Placeholder for the actual function that fetches the user's profile data
    // This should return a document snapshot with the user's profile data
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap;
  }
  
  export async function setMyPreferences(data, uid) {
    try {
      if (!uid) {
        uid = auth.currentUser?.uid;
      }
  
      // Reference to the specific document in the 'preferences' subcollection
      const preferencesDocRef = doc(db, 'users', uid, 'preferences', '1');
  
      // Set the document in the 'preferences' subcollection
      await setDoc(preferencesDocRef, data, { merge: true });
  
      console.log('Preferences set successfully');
      return 'Preferences set successfully';
    } catch (error) {
      console.error('Error setting preferences:', error);
      throw new Error('Failed to set preferences');
    }
  }
  
  export async function autoGenPreferences(uid) {
    if (!uid) {
      uid = auth.currentUser?.uid;
    }
  
    // Get the user's profile
    const user = await getMyProfile(uid);
    const userProfile = user.data();
    const { dob, marital_status, gender, religion } = userProfile;
  
    if (!(dob && marital_status && gender && religion)) {
      throw new Error('Required parameters not set! Preference not generated.');
    }
  
    const age = moment().diff(moment(dob, 'DD/MM/YYYY'), 'years');
    console.log('age', age);
  
    // Set fromDate
    let fromAge = 21;
    if (age - 5 > fromAge) {
      fromAge = age - 5;
    }
    let toAge = 50;
    if (age + 5 < toAge) {
      toAge = age + 5;
    }
  
    let pGender = 'male';
    if (gender === 'male') {
      pGender = 'female';
    }
  
    const preferences = {
      fromValue: fromAge,
      toValue: toAge,
      gender: pGender,
      religion: religion,
      marital_status: marital_status,
    };
    console.log("preferences---",preferences);
    return await setMyPreferences(preferences, uid);
  }

export async function updateProfile(data, uid = null) {
    try {
        // If uid is not provided, get it from the currently authenticated user
        if (!uid) {
            uid = auth.currentUser?.uid;
            if (!uid) {
                throw new Error('User is not authenticated');
            }
        }
        console.log(data);

        // Reference to the user's document in the Firestore collection
        const userDocRef = doc(usersCollection, uid);

        // Update the user's profile data with merge option
        await setDoc(userDocRef, data, { merge: true });

        return 'Profile updated successfully!';
    } catch (error) {
        console.error('Error updating profile:', error);
        throw new Error('Unable to update profile');
    }
}

export async function signInWithPhone(phoneNumber, forceResend = false) {
    // console.log(phoneNumber);
    try {
        //   await AsyncStorage.clear();
    } catch (error) {
        console.log('Failed to clear AsyncStorage', error);
    }

    return auth.signInWithPhoneNumber(phoneNumber, forceResend);
}

export async function getReligions() {
    try {
        const religionCollection = collection(db, 'religions');
        const religionSnapshot = await getDocs(religionCollection);

        const religions = religionSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
        }));
        console.log("religions", religions);
        return religions;
    } catch (error) {
        console.error('Error fetching religions:', error);
        return [];
    }
}

export async function uploadDisplayPic(uid, filename, file) {
    const storageRef = ref(storage, 'images/' + filename);

    try {
        // Upload the file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Save the URL to Firestore
        const userDocRef = doc(db, 'users', uid, 'images', 'dp');
        await setDoc(userDocRef, { url: downloadURL });

        return 'Image saved!';
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Unable to upload image');
    }
}
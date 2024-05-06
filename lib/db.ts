import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    getDoc,
    addDoc,
    doc,
    updateDoc,
    or,
    and,
    FieldPath,
    DocumentData,
    documentId,
    setDoc,
    deleteDoc,
    PartialWithFieldValue,
    QueryDocumentSnapshot
} from "firebase/firestore/lite";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const firebaseConfig = {
    apiKey: "AIzaSyBIXjCazFjCaHH-jyONjHH66vX1tSFjf5U",
    authDomain: "intellecta-e4131.firebaseapp.com",
    projectId: "intellecta-e4131",
    storageBucket: "intellecta-e4131.appspot.com",
    messagingSenderId: "1014338758665",
    appId: "1:1014338758665:web:a95be90e839e525c2070d8",
    measurementId: "G-BY9KJDKFDZ",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// Models
class User {
    email: string;
    password: string;
    dob: string;
    is_admin: boolean;
    id: string | null;

    constructor(
        email: string,
        password: string,
        dob: string,
        is_admin = false,
        id: string | null = null,
    ) {
        this.email = email;
        this.password = password;
        this.dob = dob;
        this.is_admin = is_admin;
        this.id = id;
    }

    toString(): string {
        return this.email + ", " + this.password + ", " + this.dob;
    }
}

// Firestore data converter
const userConverter = () => ({
    toFirestore(user: PartialWithFieldValue<User>) {
        return {
            email: user.email,
            password: user.password,
            dob: user.dob,
            is_admin: user.is_admin || false,
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): User {
        const data = snapshot.data();
        return new User(
            data.email,
            data.password,
            data.dob,
            data.is_admin,
            snapshot.id,
        );
    },
});

const Users = collection(db, "users").withConverter(userConverter());

class Profile {
    academic_preference: string[];
    interest: string[];
    userid: string;
    matches: string[];
    id: string | null;

    constructor(
        academic_preference: string,
        interest: string,
        userid: string,
        id: string | null = null,
        matches: string[] | null = null
    ) {
        this.academic_preference = academic_preference.split(",");
        this.interest = interest.split(",");
        this.userid = userid;
        this.id = id;
        this.matches = matches ?? [];
    }

    toString(): string {
        return this.academic_preference.join(",") + "," + this.interest.join(",");
    }
}

const profileConverter = () => ({
    toFirestore(profile: PartialWithFieldValue<Profile>): any {
        return {
            academic_preference: profile.academic_preference,
            interest: profile.interest,
            userid: profile.userid,
            matches: profile.matches
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): Profile {
        const data = snapshot.data();
        return new Profile(
            Array.isArray(data.academic_preference) ? data.academic_preference.join(",") : data.academic_preference,
            Array.isArray(data.interest) ? data.interest.join(",") : data.interest,
            data.userid,
            snapshot.id,
            data.matches
        );
    },
});

const Profiles = collection(db, "profiles").withConverter(profileConverter());

class Event {
    name: string;
    type: string;
    datetime: string;
    college_id: string | null;
    college: College | null;
    id: string | null;

    constructor(
        name: string,
        type: string,
        datetime: string,
        college_id: string | null = null,
        college: College | null = null,
        id: string | null = null,
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.datetime = datetime;
        this.college_id = college_id;
        if (college) {
            this.college = college;
        }else{
            this.college = null;
        }
    }

    toString(): string {
        return this.name + ", " + this.type + ", " + this.datetime;
    }
}

const eventConverter = () => ({
    toFirestore(event: PartialWithFieldValue<Event>): any {
        return {
            name: event.name,
            type: event.type,
            datetime: event.datetime,
            college_id: event.college_id,
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): Event {
        const data = snapshot.data();
        return new Event(
            data.name,
            data.type,
            data.datetime,
            data.college_id,
            null,
            snapshot.id,
        );
    },
});

const Events = collection(db, "events").withConverter(eventConverter());

class College {
    name: string;
    created_at: string | null;
    updated_at: string | null;
    delete_at: string | null;
    id: string | null;

    constructor(
        name: string,
        created_at: string | null = null,
        updated_at: string | null = null,
        delete_at: string | null = null,
        id: string | null = null,
    ) {
        this.name = name;
        this.created_at = created_at;
        this.updated_at = created_at;
        this.delete_at = delete_at;
        this.id = id;
    }

    toString(): string {
        return this.name;
    }
}

const collegeConverter = () => ({
    toFirestore(college: PartialWithFieldValue<College>): any {
        return {
            name: college.name,
            created_at: college.created_at,
            updated_at: college.updated_at,
            delete_at: college.delete_at,
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): College {
        const data = snapshot.data();
        return new College(
            data.name,
            data.created_at,
            data.updated_at,
            data.delete_at,
            snapshot.id,
        );
    },
});

const Colleges = collection(db, "colleges").withConverter(collegeConverter());

class PeerGroup {
    id: string | null;
    name: string;
    description: string;
    users: string[];
    image: string;

    constructor(name: string, description: string, image: string, users: string[] = [], id: string | null = null){
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.users = users;
    }

    toString(): string{
        return this.name;
    }
}

const peerGroupConvertor = () => ({
    toFirestore: (peerGroup: PartialWithFieldValue<PeerGroup>) => {
        return {
            name: peerGroup.name,
            description: peerGroup.description,
            image: peerGroup.image,
            users: peerGroup.users
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot) => {
        const data = snapshot.data();
        return new PeerGroup(
            data.name,
            data.description,
            data.image,
            data.users,
            snapshot.id
        )
    }
})

const PeerGroups = collection(db, "peer_groups").withConverter(peerGroupConvertor());

export async function login(email: string, password: string): Promise<string> {
    const q = query(Users, where('email', '==', email))
    const usersRef = await getDocs(q)
    if (usersRef.empty) {
        throw new Error("User not found");
    }
    const userDoc = usersRef.docs[0];
    const user = userDoc.data();

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password as string);
    if (!validPassword) {
        throw new Error("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign({ id: userDoc.id }, 'secretkey');

    return token
}

export async function register(email: string, password: string, dob: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email already exists
    const q = query(Users, where('email', '==', email))
    const usersRef = await getDocs(q)
    if (!usersRef.empty) {
        throw new Error("Email already exists");
    }

    // Add user to Firestore
    await addDoc(Users, new User(email, hashedPassword, dob))
}

export async function getEvents() {
    const events: DocumentData = [];
    const q = query(Events)

    const eventsSnapShot = await getDocs(q)
    eventsSnapShot.forEach(async (eventDoc) => {
        // const event = eventDoc.data()
        // var college = null
        // if (event.college_id) {
        //     college = (await getDoc(doc(db, "colleges", event.college_id))).data()
        // }
        // const newEvent = new Event(event.name, event.type, event.datetime, event.college_id, college, eventDoc.id);
        // events.push(newEvent);
        events.push(eventDoc.data());
    })

    return events;
}

export async function addEvent(name: string, type: string, datetime: string, college_id: string){
    await addDoc(Events, new Event(name, type, datetime, college_id))
}

export async function getColleges(){
    const colleges: DocumentData = [];
    const q = query(Colleges)

    const collegesSnapShot = await getDocs(q)
    collegesSnapShot.forEach((doc) => {
        colleges.push(doc.data());
    })

    return colleges
}

export async function verifyToken(token: string): Promise<string>{
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if(err){
                reject(err);
            }

            resolve((decoded as User)?.id!)
        })
    })
}

export async function getUsers(){
    const q = query(Users);
    const userRef = await getDocs(q);

    const users = []
    for(let userSnap of userRef.docs){
        users.push(userSnap.data())
    }

    return users
}

export async function getPeerGroups(){
    const q = query(PeerGroups);
    const peerRef = await getDocs(q);

    const peerGroups = []
    for(let peerSnap of peerRef.docs){
        peerGroups.push(peerSnap.data())
    }

    return peerGroups as PeerGroup[]
}

export async function getProfile(id: string){
    const profileQuery = query(Profiles, where("userid", "==", id))
    const profileRef = await getDocs(profileQuery);

    if(profileRef.empty){
        throw new Error("No profile exists")
    }

    const profileDoc = profileRef.docs[0];
    const profile = profileDoc.data() as Profile
    return profile
}

export async function getUser(id: string){
    const q = query(Users, where(documentId(), "==", id));
    const userRef = await getDocs(q);
    
    if(userRef.empty){
        throw new Error("User does not exist");
    }

    const userDoc = userRef.docs[0];
    const user = userDoc.data() as User;

    return {
        email: user.email,
        dob: user.dob,
        is_admin: user.is_admin
    }
}

export async function addProfile(id: string, email: string, dob: string, academic_preference: string, interests: string){
    await updateDoc(doc(db, "users", id), {
        email: email,
        dob: dob
    })

    const profileSnapshot = await getDocs(query(Profiles, where("userid", "==", id)))
    if(profileSnapshot.empty){
        await addDoc(Profiles, new Profile(academic_preference, interests, id))
    }else{
        await updateDoc(doc(db, "profiles", profileSnapshot.docs[0].id), {
            academic_preference: academic_preference,
            interest: interests,
            userid: id
        })
    }
}

export async function getPeerGroup(title: string){
    console.log(title)
    const peerGroupSnaps = await getDocs(query(PeerGroups, where("name", "==", title)));

    if(peerGroupSnaps.empty){
        throw new Error("Could not find peer group")
    }

    const peerGroup = peerGroupSnaps.docs[0].data();

    return peerGroup;
}

export async function addPeerGroup(image: File, title: string, description: string){
    await addDoc(PeerGroups, new PeerGroup(title, description, await uploadFile(image)))
}

export async function deletePeerGroup(title: string){
    const peerGroupSnap = await getDocs(query(PeerGroups, where("name", "==", title)));
    await deleteDoc(doc(db, "peer_groups", peerGroupSnap.docs[0].id))
}

export async function addUserToPeerGroup(title: string, userId: string){
    const peerGroupSnap = await getDocs(query(PeerGroups, where("name", "==", title)));
    const data = peerGroupSnap.docs[0].data();
    await updateDoc(doc(db, "peer_groups", peerGroupSnap.docs[0].id), {
        users: Array.from(new Set((data.users as string[]).concat([userId])))
    })
}

export async function uploadFile(file: File): Promise<string>{
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef);
}

export type {User, College, PeerGroup, Event, Profile};
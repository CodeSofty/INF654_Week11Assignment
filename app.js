        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
        import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
        
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDCnSnp50dQpwWdzvp8CXRRjedFKfbZM_I",
        authDomain: "chapter10-f1013.firebaseapp.com",
        projectId: "chapter10-f1013",
        storageBucket: "chapter10-f1013.appspot.com",
        messagingSenderId: "420687035296",
        appId: "1:420687035296:web:0740fe43cd25fb475e82c5"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);





// Get a list of cities from your database
async function getGyms(db) {
    const gymCol = collection(db, 'gym');
    const gymSnapshot = await getDocs(gymCol);
    const gymList = gymSnapshot.docs.map(doc => doc.data());
    return gymList;
}

getGyms(db);


const gymList = document.querySelector('#gym-list');
const form = document.querySelector('#add-gym-form');

// Renders data to the browser
function renderGym(doc_data){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let location = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc_data.id);

  
    name.textContent = doc_data.data().name;
    location.textContent = doc_data.data().address;
    cross.textContent = 'DELETE';
    cross.style.color = 'red';
    cross.style.cursor = 'pointer';
    
    
// Append new elements to the UL
    li.appendChild(name);
    li.appendChild(location);
    li.appendChild(cross);
    gymList.appendChild(li);

    li.addEventListener('click', (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        const upDoc = doc(db, 'gym', id);
        updateDoc(upDoc, {
            name: form.name.value,
            address: form.address.value
        })
    });

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        deleteDoc(doc(db, 'gym', id));
    });
};

// Create snapshot of each doc data, and passes it to be rendered
const gyms = getDocs(collection(db, 'gym')).then((snapshot) => {
    snapshot.forEach((doc => {
        renderGym(doc);
    }));
});

let searchInput = document.querySelector('#search_input').value;
const q = query(collection(db, 'gym'), where('name', '==', searchInput));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data);
});


form.addEventListener(('submit'),(e) => {
    e.preventDefault();
    const docRef = addDoc(collection(db, 'gym'), {
        name: form.name.value,
        address: form.address.value

    });
}); 
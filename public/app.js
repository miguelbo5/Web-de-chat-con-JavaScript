//Div de botones inicio de sesion y cerrar sesion
const botones = document.querySelector('#botones')

//Nombre de usuario
const nombreUsuario = document.querySelector('#nombreUsuario')

const contenidoProtegido = document.querySelector('#contenidoProtegido')

const formulario = document.querySelector('#formulario')

const inputChat = document.querySelector('#inputChat')

firebase.auth().onAuthStateChanged(user => {

    if(user){ 
        
        console.log(user)
        
        botones.innerHTML = /*html*/`<button id='btnCerrarSesion' class="btn btn-outline-danger">Cerrar sesión</button>`

        nombreUsuario.innerHTML = user.displayName

        cerrarSesion()

        formulario.classList = 'input-group py-2 fixed-bottom container'

        contenidoChat(user)

    }else{
        
        botones.innerHTML = /*html*/`<button id='btnAcceder' class="btn btn-outline-success mr-2">Acceder</button>`

        nombreUsuario.innerHTML = 'Chat'
        
        iniciarSesion()

        contenidoProtegido.innerHTML = /*html*/`<p class="text-center lead mt-2">Tienes que iniciar sesión</p>`

        formulario.classList = 'input-group py-2 fixed-bottom container d-none'

    }

})

const contenidoChat = (user) => {

    //contenidoProtegido.innerHTML = /*html*/`<p class="text-center lead mt-2">Bienvenido de nuevo, ${user.email}</p>`

    formulario.addEventListener('submit', (e) => {

        e.preventDefault()

        if(!inputChat.value.trim()){

            console.log('input vacio')

            return

        }

        firebase.firestore().collection('chat').add({

            texto: inputChat.value, 
            uid: user.uid,
            fecha: Date.now()

        })
        .then(res => {console.log("Mensaje guardado en la base de datos")})
        .catch(e => console.log(e))

    inputChat.value = ''
        
    })


    firebase.firestore().collection('chat').orderBy('fecha').onSnapshot(query =>{

        //console.log(query)

        contenidoProtegido.innerHTML = ''

        query.forEach(doc => {

            //console.log(doc.data())

            if(doc.data().uid === user.uid){

                contenidoProtegido.innerHTML +=
                /*html*/`<div class="d-flex justify-content-end">
                    <span class="badge badge-primary p-2 mt-1">${doc.data().texto}</span>
                </div>`

            }else{

                contenidoProtegido.innerHTML += 
                /*html*/`<div class="d-flex justify-content-start">
                    <span class="badge badge-secondary p-2 mt-1">${doc.data().texto}</span>
                </div>`

            }

            contenidoProtegido.scrollTop = contenidoProtegido.scrollHeight

        })

    })


}

const cerrarSesion = () =>{

    const btnCerrarSesion = document.querySelector('#btnCerrarSesion')
    btnCerrarSesion.addEventListener('click', () => {

        firebase.auth().signOut()

    })

}

const iniciarSesion = () => {

    const btnAcceder = document.querySelector('#btnAcceder')

    btnAcceder.addEventListener('click', async() => {
            console.log('click')
        try {
            const provider = new firebase.auth.GoogleAuthProvider()

            await firebase.auth().signInWithPopup(provider)

        } catch (error) {
            console.log('Error en el inicio de sesión')
        }

    })

}
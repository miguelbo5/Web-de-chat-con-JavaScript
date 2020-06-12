const botones = document.querySelector('#botones')

const nombreUsuario = document.querySelector('#nombreUsuario')


firebase.auth().onAuthStateChanged(user => {

    if(user){ 
        
        console.log(user)
        
        botones.innerHTML = /*html*/`<button id='btnCerrarSesion' class="btn btn-outline-danger">Cerrar sesión</button>`

        nombreUsuario.innerHTML = user.displayName

        cerrarSesion()

    }else{
        console.log('No existe el usuario.')
        botones.innerHTML = /*html*/`<button id='btnAcceder' class="btn btn-outline-success mr-2">Acceder</button>`

        nombreUsuario.innerHTML = 'Chat'
        
        iniciarSesion()
    }

    

})

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
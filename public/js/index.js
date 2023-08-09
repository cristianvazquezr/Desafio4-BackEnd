const socket=io()

const handleClick=()=>{
    socket.emit("actualizo",true)
}

socket.on("productos",data=>{
    console.log(data)
    const contenedorTabla=document.getElementById("contenedorTabla")
    data.forEach(element => {contenedorTabla.innerHTML+=
    `
    <tr key=${element.id}>
        <td>${element.id}</td>
        <td>${element.title}</td>
        <td>${element.description}</td>
        <td>${element.category}</td>
        <td>${element.price}</td>
        <td>${element.thumbnail}</td>
        <td>${element.code}</td>
        <td>${element.stock}</td>
        <td>${element.status}</td>
        <td><input type="submit" id="boton" class="${element.id}" value="🗑️"></input></td>
    </tr>
    `
    });
})
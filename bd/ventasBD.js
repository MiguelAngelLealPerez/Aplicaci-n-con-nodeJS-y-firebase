const ventasBD=require("./conexion").ventas;
const Venta = require("../clases/ventasClases");
const { ventas }= require("./conexion");

function validarDatos(venta2){
    var datosCorrectos=false;
    if(venta2.status!=undefined && venta2.cantidad!= undefined && venta2.fechayhora!= undefined  && venta2.nombreUsuario!= undefined && venta2.nombreProducto!= undefined){
     datosCorrectos=true;
    }
        return datosCorrectos;
}

async function mostrarVentas(){
    const ventas=await ventasBD.get();
    var ventasValidas=[];
    ventas.forEach(venta => {
        const venta1= new  Venta({id:venta.id,...venta.data()});
        const venta2 = venta1.getVenta;
        if(validarDatos(venta2)){
            ventasValidas.push(venta2);
        }
    });
    return ventasValidas;
}

async function buscarPorId(id) {
    const venta=await ventasBD.doc(id).get();//productosBD.doc(id).get() && usuariosBD.doc(id).get();
    const venta1=new Venta({id:venta.id,...venta.data()});
    var ventaValida={error:true};
    if(validarDatos(venta1.getVenta)){
    ventaValida=venta1.getVenta
    }
    return ventaValida
}

async function nuevaVenta(data){
    const venta1=new Venta(data);
    var ventaValida=false;
    if(validarDatos(venta1.getVenta)){
        await ventasBD.doc().set(venta1.getVenta)
        ventaValida=true;
    }
    return ventaValida;
}

async function cancelarVenta(id) {
    const venta = buscarPorId(id);
    var cancelada=false;
    if(venta.error!=true){
        await ventasBD.doc(id).update({ status: "Cancelada" });
        cancelada=true;
    }
    return cancelada;
}

module.exports={
    mostrarVentas,
    nuevaVenta,
    cancelarVenta,
    buscarPorId
}

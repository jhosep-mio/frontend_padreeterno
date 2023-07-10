const Registro = (): JSX.Element => {
  return (
    <>
        <section className="iti-barbg1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="iti-barcontent">
                            <h2 className="iti-bartitle">Regístrate</h2>
                            <ul className="iti-barlist">
                                <li><a href="#">Inicio</a></li>
                                <li>Registro de usuario</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="log-bagrnd1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="log-bgroung-1">
                        <h3 className="log-tinw1">Registrar Cuenta</h3>

                        <form className="hmfrmcontac formulario" action="{$base_url}cliente/proceso/registrarse" method="POST">
                            <span className="respuesta"></span>
                            <div className="row">
                                <div className="response"></div>
                                <div className="col-md-12">
                                    <p className="rg-titdatos1">
                                        Datos Personales
                                    </p>
                                </div>

                                <div className="form-group col-md-6">
                                    <div className="gs1-frmCnt">
                                        <input className="form-control gs1-inpfrm" id="nombre" name="nombre" type="text" placeholder="Nombres" maxLength={120} autoComplete="off" />
                                        <span aria-hidden="true" className="fa fa-user gs1-frmIcon"></span>
                                    </div>
                                </div>

                                <div className="form-group col-md-6">
                                    <div className="gs1-frmCnt">
                                        <input className="form-control gs1-inpfrm" id="apellido" name="apellido" type="text" placeholder="Apellidos" maxLength={120} autoComplete="off" />
                                        <span aria-hidden="true" className="fa fa-user gs1-frmIcon"></span>
                                    </div>
                                </div>

                                <div className="form-group col-md-6">
                                    <div className="gs1-frmCnt">
                                        <input className="form-control gs1-inpfrm" id="email" name="usuario" type="email" placeholder="E-mail" maxLength={120} autoComplete="off" />
                                        <span aria-hidden="true" className="fa fa-envelope-o gs1-frmIcon"></span>
                                    </div>
                                </div>

                                <div className="form-group col-md-6">
                                    <div className="gs1-frmCnt">
                                        <input className="form-control gs1-inpfrm" id="telefono" name="telefono" type="text" placeholder="Teléfono ó Celular" maxLength={9} autoComplete="off" />
                                        <span aria-hidden="true" className="fa fa-phone gs1-frmIcon"></span>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <p className="rg-titdatos1">
                                        Tú Contraseña
                                    </p>
                                </div>
                                <div className="form-group col-md-6">
                                    <div className="gs1-frmCnt">
                                        <input className="form-control gs1-inpfrm" id="clave" name="clave" type="password" placeholder="Contraseña" maxLength={20} />
                                        <span aria-hidden="true" className="fa fa-lock gs1-frmIcon"></span>
                                    </div>
                                </div>

                                <div className="form-group col-md-6">
                                    <div className="gs1-frmCnt">
                                        <input className="form-control gs1-inpfrm" id="reclave" name="reclave" type="password" placeholder="Confirmar Contraseña" maxLength={20} />
                                        <span aria-hidden="true" className="fa fa-lock gs1-frmIcon"></span>
                                    </div>
                                </div>

                                {/* <div className="col-md-12">
                                    <p className="rg-titdatos1">
                                        Suscribirse al Boletín
                                    </p>
                                </div>

                                <div className="form-group col-md-12">
                                    <label className="radio-inline"><input type="radio" name="optradio">Sí, me suscribo</label>
                                    <label className="radio-inline"><input type="radio" name="optradio">No, me suscribo</label>
                                </div> */}

                                <div className="form-group text-right col-md-12">
                                    {/* {*<div className="checkbox">
                                        <label className="rg-termycon1"><input type="checkbox" value="condicion" name="condicion"> He leído y acepto la <a data-toggle="modal" data-target="#">Política, Términos y Condiciones</a></label>
                                    </div>*} */}
                                    <input type="submit" value="Registrarse" className="btn gs1-botx-1 save" />
                                </div>
                            </div>
                        </form>

                    </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Registro

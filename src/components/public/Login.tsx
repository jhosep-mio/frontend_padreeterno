// import React from 'react'

const Login = (): JSX.Element => {
  return (
    <>
        <section className="iti-barbg1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="iti-barcontent">
                            <h2 className="iti-bartitle">Login</h2>
                            <ul className="iti-barlist">
                                <li><a href="#">Inicio</a></li>
                                <li>Login</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="log-bagrnd1">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-push-6 col-md-6 col-md-push-6">
                        <div className="log-bgroung-1">
                            <h3 className="log-tinw1">INICIAR SESIÓN</h3>
                            <form className="hmfrmcontac formulario" action="{$base_url}cliente/proceso/ingreso" method="POST">
                                <span className="respuesta"></span>
                                <div className="form-group">
                                    <div className="gs1-frmCnt">
                                        <input className="form-control gs1-inpfrm" id="email" type="email" name="email" placeholder="E-mail" autoComplete="off"/>
                                        <span aria-hidden="true" className="fa fa-envelope gs1-frmIcon"></span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="gs1-frmCnt">
                                        <input className="form-control gs1-inpfrm" id="password" type="password" name="password" placeholder="Contraseña" minLength={5} maxLength={30} autoComplete="off" />
                                        <span aria-hidden="true" className="fa fa-lock gs1-frmIcon"></span>
                                    </div>
                                </div>

                                <p className="log-passolv4d1">
                                    <a href="{$base_url}recuperar_contrasena">
                                        ¿Olvidaste contraseña?
                                    </a>
                                </p>

                                <div className="form-group text-right">
                                    <input type="submit" value="Ingresar" className="btn gs1-botx-1 save" />
                                </div>
                            </form>

                        </div>
                    </div>

                    <div className="col-sm-6 col-sm-pull-6 col-md-6 col-md-pull-6">
                        <div className="log-bgroung-1">
                            <h3 className="log-tinw1">REGISTRATE</h3>
                            <p className="log-txtinw1">
                                Al crear una cuenta podrás comprar más rápido en tus próximas compras y nos ayudas a registrate en nuestro historial de compras.
                            </p>

                            <a href="/registro" className="btn gs1-botx-1">
                                Registrarse
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Login

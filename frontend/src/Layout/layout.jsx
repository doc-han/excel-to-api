import React from 'react';

const Layout = ({ children }) => {
    return (
        <section className="section">
            <div className="columns is-centered">
                <div className="column is-half">
                    <section class="hero is-dark">
                        <div class="hero-body">
                            <div class="container">
                                <h1 class="title">Excel to API</h1>
                                <h2 class="subtitle">Make your excel data accessible through an endpoint</h2>
                            </div>
                        </div>
                    </section>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default Layout;
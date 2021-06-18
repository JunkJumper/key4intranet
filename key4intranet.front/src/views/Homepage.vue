<template>
    <div id="DashboardHomepageContainer">
        <body class="esp-cl services background-visuel background-visuel-A">


    <!-- Wrapper global (avec cadre) -->

    <div class="wrapper framed">


        <!-- Header -->

        <header>
            <a href="javascript:;" class="menu-left-trigger d-lg-none">
                <i class="icon icon-md ml-1"><svg class="primary"><use xlink:href="../../public/assets/images/sprites.svg#icon-menu" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></i>
            </a>
            <a href="javascript:;" class="logo">
                <svg class="original" viewBox="0 0 200 54"><use xlink:href="images/sprites.svg#logo-key4events" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg>
            </a>
            <ul class="user-infos list-unstyled p-0 m-0">
                <li class="profile mr-2 mr-lg-4">
                    <img src="../../public/assets/images/samplePP.png" alt="samplePP" class="namePP" />
                    <span class="d-inline-block align-middle mr-1 text-truncate" id="WorkerName">John Doe</span>
                </li>
            </ul>
            <ul class="user-options d-none d-lg-flex list-unstyled p-0 pl-3 m-0 ml-2 ml-lg-3">
                <li class="lang-selector dropdown pl-3 pl-lg-4 mr-2 mr-lg-3">
                    <a href="javascript:;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">FR</a>
                    <ul class="dropdown-menu dropdown-menu-right list-unstyled p-0">
                        <li><a href="javascript:;" class="active" title="Français">FR</a></li>
                        <li><a href="javascript:;" data-toggle="tooltip" data-placement="left" title="English">EN</a></li>
                    </ul>
                </li>
                <li class="logout mr-3 mr-lg-4">
                    <a href="javascript:;" class="d-inline-block" data-toggle="tooltip" data-placement="bottom" title="Déconnexion">
                        <i class="icon icon-md op-6 op-h-10"><svg class="gray"><use xlink:href="../../public/assets/images/sprites.svg#icon-logout" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></i>
                    </a>
                </li>
            </ul>
        </header>


        <!-- Zone de contenus -->

        <main>


            <!-- Menu gauche -->

            <nav class="menu-left">
                <div class="w-100 h-100 pt-lg-5">
                    <a href="javascript:;" class="close-menu-left d-lg-none text-center pt-2"><i class="fal fa-2x fa-times text-white align-bottom"></i></a>
                    <ul class="list-unstyled p-0">
                        <li>
                            <a href="javascript:;" class="btn btn-lg btn-primary bg-gradient text-truncate" data-toggle="tooltip" data-placement="top" title="Accueil" id="active">
                                <i class=" fas fa-home sidebarIcons"></i> Accueil
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" class="btn btn-lg text-original text-truncate" data-toggle="tooltip" data-placement="top" title="Blog">
                                <i class="fas fa-blog sidebarIcons"></i> Blog
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" class="btn btn-lg text-original text-truncate" data-toggle="tooltip" data-placement="top" title="Calendrier">
                                <i class="far fa-calendar-alt sidebarIcons"></i> Calendrier
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" class="btn btn-lg text-original text-truncate" data-toggle="tooltip" data-placement="top" title="Vie de l'entreprise">
                                <i class="far fa-building sidebarIcons"></i> Vie de l'entreprise
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" class="btn btn-lg text-original text-truncate" data-toggle="tooltip" data-placement="top" title="CSE">
                                <i class="far fa-handshake sidebarIcons"></i> CSE
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" class="btn btn-lg text-original text-truncate" data-toggle="tooltip" data-placement="top" title="Outils">
                                <i class="fas fa-tools sidebarIcons"></i> Outils
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" class="btn btn-lg text-original text-truncate" data-toggle="tooltip" data-placement="top" title="Galerie">
                                <i class="fas fa-camera sidebarIcons"></i> Galerie
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" class="btn btn-lg text-original text-truncate" data-toggle="tooltip" data-placement="top" title="Documentation">
                                <i class="far fa-file-alt sidebarIcons"></i> Documentation
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" class="btn btn-lg text-original text-truncate" data-toggle="tooltip" data-placement="top" title="Collaborateurs">
                                <i class="fas fa-users sidebarIcons"></i> Collaborateurs
                            </a>
                        </li>
                    </ul>
                    <a href="javascript:;" class="toggler d-none d-lg-block"></a>
                </div>
            </nav>

            <!-- Contenus -->

            <article class="container-fluid">
                <section class="row">
                    <div class="col" id="title">
                        <div class="title">
                            <h1 class="mb-0">Accueil</h1>
                            <subtitle>Intranet key4events digital</subtitle>
                        </div>
                    </div>
                </section>
                <ul class="tiles row list-unstyled p-0">
                    <li class="onlineLarge col-12 mb-4">
                        <section class="bg-orange shadow-lg">
                            <h3 class="section sectionLine">Information</h3>
                            <div class="container-fluid x-carousel" flickity-draggableunder="1200">
                                <div class="isflickity w-100">
                                    <div class="carousel-cell col-12 col-md-6 col-xl-4 card">
                                        <a href="./documentation.html" class="text-center text-lg-left no-ul">
                                            <i class="far fa-file-alt section"></i>
                                            <h5 class="mb-0 text-white section">Documentation</h5>
                                            <p class="mt-2 text-white op-6 section">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat recusandae quam atque vitae fuga nesciunt consectetur quasi commodi, ipsa ipsam.</p>
                                        </a>
                                    </div>
                                    <div class="carousel-cell col-12 col-md-6 col-xl-4 card">
                                        <a href="javascript:;" class="text-center text-lg-left no-ul">
                                            <i class="fas fa-book-open section"></i>
                                            <h5 class="mb-0 text-white section">Ressources</h5>
                                            <p class="mt-2 text-white op-6 section">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat recusandae quam atque vitae fuga nesciunt consectetur quasi commodi, ipsa ipsam.</p>
                                        </a>
                                    </div>
                                    <div class="carousel-cell col-12 col-md-6 col-xl-4 card">
                                        <a href="./tools.html" class="text-center text-lg-left no-ul">
                                            <i class="fas fa-tools section"></i>
                                            <h5 class="mb-0 text-white section">Outils</h5>
                                            <p class="mt-2 text-white op-6 section">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat recusandae quam atque vitae fuga nesciunt consectetur quasi commodi, ipsa ipsam.</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </li>
                    <li class="onlineLarge col-12 mb-4">
                        <section class="bg-teal shadow-lg">
                            <h3 class="section sectionLine">Communication</h3>
                            <div class="container-fluid x-carousel" flickity-draggableunder="1200">
                                <div class="isflickity w-100">
                                    <div class="carousel-cell col-12 col-md-6 col-xl-4 card">
                                        <a href="javascript:;" class="text-center text-lg-left no-ul">
                                            <i class="fas fa-blog section"></i>
                                            <h5 class="mb-0 text-white section">Blog</h5>
                                            <p class="mt-2 text-white op-6 section">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat recusandae quam atque vitae fuga nesciunt consectetur quasi commodi, ipsa ipsam.</p>
                                        </a>
                                    </div>
                                    <div class="carousel-cell col-12 col-md-6 col-xl-4 card">
                                        <a href="javascript:;" class="text-center text-lg-left no-ul">
                                            <i class="far fa-calendar-alt section"></i>
                                            <h5 class="mb-0 text-white section">Calendrier</h5>
                                            <p class="mt-2 text-white op-6 section">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat recusandae quam atque vitae fuga nesciunt consectetur quasi commodi, ipsa ipsam.</p>
                                        </a>
                                    </div>
                                    <div class="carousel-cell col-12 col-md-6 col-xl-4 card">
                                        <a href="javascript:;" class="text-center text-lg-left no-ul">
                                            <i class="far fa-building section"></i>
                                            <h5 class="mb-0 text-white section">Vie de l'entreprise</h5>
                                            <p class="mt-2 text-white op-6 section">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat recusandae quam atque vitae fuga nesciunt consectetur quasi commodi, ipsa ipsam.</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </li>
                </ul>


                <!-- Rappel icône (fond) -->

                <i class="icon icon-bg icon-md"><svg><use xlink:href="../../public/assets/images/sprites.svg#icon-dashboard" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></i>

            </article>


            <!-- Panneau surgissant "Mes informations" (droite) -->

            <aside class="profile">
                <section class="mobile-header d-lg-none">
                    <ul class="user-options list-unstyled p-0 pl-3 m-0 ml-2 ml-lg-3">
                        <li class="lang-selector dropdown pl-3 pl-lg-4 mr-2 mr-lg-3">
                            <a href="javascript:;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">FR</a>
                            <ul class="dropdown-menu dropdown-menu-right list-unstyled p-0">
                                <li><a href="javascript:;" class="active" title="Français">FR</a></li>
                                <li><a href="javascript:;" data-toggle="tooltip" data-placement="left" title="English">EN</a></li>
                            </ul>
                        </li>
                        <li class="logout mr-3 mr-lg-4">
                            <a href="login.html" class="d-inline-block" data-toggle="tooltip" data-placement="bottom" title="Déconnexion">
                                <i class="icon icon-md op-6 op-h-10"><svg class="gray"><use xlink:href="../../public/assets/images/sprites.svg#icon-logout" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></i>
                            </a>
                        </li>
                    </ul>
                </section>
            </aside>

        </main>

    </div>


    <!-- Pied de page -->

    <footer>
        <div class="row">
            <div class="col-lg-5 col-xl-6">
                <span class="copy">
					<svg class="logo white float-left float-xxl-none" viewBox="0 0 42 50"><use xlink:href="../../public/assets/images/sprites.svg#logo-key4" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg>
					<span class="d-inline-block mt-1"><strong>©2021 key4events.</strong> Tous droits réservés.</span>
                </span>
                <span class="links d-block d-xxl-inline ml-5">
					<a href="javascript:;" class="link-under">Marques</a> <span>|</span> <a href="javascript:;" class="link-under">Déclaration de confidentialité des informations</a>
                </span>
            </div>
            <div class="col-lg-7 col-xl-6 mt-3 mt-lg-2 ml-3 pl-5 ml-lg-0 pl-lg-0 text-left text-lg-center menu-reminder">
                <a href="javascript:;" class="link-under">Support technique</a>
                <a href="javascript:;" class="link-under">Nos conditions de vente</a>
                <a href="javascript:;" class="link-under">Mentions légales</a>
            </div>
        </div>
    </footer>

</body>
    </div>
</template>
<script>


export default {
    name : 'Homepage', 
    
}
</script>

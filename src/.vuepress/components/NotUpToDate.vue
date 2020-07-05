<template>
<div class="custom-block warning" v-if="$lang == 'fr-FR'">
  <p class="custom-block-title">
    Cette page n’est pas à jour.
  </p> 
  <p>
    D’importantes modifications ont été faites dans la version anglaise de cette page. Nous vous recommandons d’utiliser la version anglaise en attendant que cette page soit mise à jour.
  </p>
</div>
<div class="custom-block warning" v-else>
  <p class="custom-block-title">
    This page isn't up to date.
  </p> 
  <p>
    Major changes have been made in the English version of this page. We suggest you use the English revision until this page is up to date.
  </p>
</div>
</template>

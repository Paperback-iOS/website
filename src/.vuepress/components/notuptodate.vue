<template>
<div class="custom-block warning" v-if='this.$page.frontmatter.lang == "fr-FR"'>
  <p class="custom-block-title">
    Cette page n’est pas à jour.
  </p> 
  <p>
    D’importantes modifications ont été faites dans la version anglaise de cette. Nous vous recommandons d’utiliser celle-ci.
  </p>
</div>
<div class="custom-block warning" v-else>
  <p class="custom-block-title">
    This page isn't up to date.
  </p> 
  <p>
    Major changes have been made in the English version of this page. We suggest you to use this one.
  </p>
</div>
</template>
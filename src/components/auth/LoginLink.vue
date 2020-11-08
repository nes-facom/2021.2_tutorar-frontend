<script>
import { AUTH_ROUTES } from "@/router/rotas/comun"

export default {
  data: () => ({ loginroute: AUTH_ROUTES.LOGIN })
}
</script>

<template>
  <div class="text-center" @click="$router.push(loginroute)">
    <span class="link">
      Já possui uma conta ? Faça login.
    </span>
  </div>
</template>

<style scoped>
.link {
  text-decoration: underline;
  color: "#e1e1e1";
}

.link:hover {
  color: #000000;
  cursor: pointer;
}
</style>

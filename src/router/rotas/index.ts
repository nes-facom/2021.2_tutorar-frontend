import error from "@/router/rotas/error"
import comun from "@/router/rotas/comun"
import monitor from "@/router/rotas/monitor"
import tutorando from "@/router/rotas/tutorando"
import professor from "@/router/rotas/professor"

const rotas = [...error, ...comun, ...professor, ...tutorando, ...monitor]

export default rotas

import BaseRepository from "./BaseRepository.js"
import Perfil from "../../models/Perfil.js"

export default class PerfilRepository extends BaseRepository {
    constructor() {
        super(Perfil)
    }
}
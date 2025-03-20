import BaseService from "./BaseService.js"
import PerfilRepository from "../repositories/PerfilRepository.js"

export default class PerfilService extends BaseService {
    constructor() {
        super(PerfilRepository)
    }
}
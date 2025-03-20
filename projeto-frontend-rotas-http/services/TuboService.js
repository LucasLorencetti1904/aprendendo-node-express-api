import BaseService from "./BaseService.js"
import TuboRepository from "../repositories/TuboRepository.js"

export default class TuboService extends BaseService {
    constructor() {
        super(TuboRepository)
    }
}
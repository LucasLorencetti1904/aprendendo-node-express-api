import BaseRepository from "./BaseRepository.js"
import Tubo from "../../models/Tubo.js"

export default class TuboRepository extends BaseRepository {
    constructor() {
        super(Tubo)
    }
}
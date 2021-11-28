class Recipe{
    constructor(title, difficulty, quantity, procedure, materials, teaName, taste, notes, id) {
            this.title = title,
            this.difficulty = difficulty,
            this.yield = quantity,
            this.procedure = procedure,
            this.materials = materials,
            this.teaName = teaName,
            this.taste = taste,
            this.notes = notes,
            this.id = id
    }
}
module.exports = {
    Recipe
};
class Recipe{
    constructor(title, difficulty, quantity, procedure, materials, teaName, taste, notes) {
            this.title = title,
            this.difficulty = difficulty,
            this.yield = quantity,
            this.procedure = procedure,
            this.materials = materials,
            this.teaName = teaName,
            this.taste = taste,
            this.notes = notes
    }
}
module.exports = {
    Recipe
};
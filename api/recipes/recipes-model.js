function getRecipeById(id) {
    return Promise.resolve(`a recipe retrieved by id ${id}`)
}

module.exports = {
    getRecipeById
}
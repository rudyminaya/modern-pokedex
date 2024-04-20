const urlBase = 'https://pokeapi.co/api/v2'

const getAllPokemons = async (nextURL:string | null):Promise<({name:string,url:string}[])> => {
    const response = await fetch(nextURL??`${urlBase}/pokemon?limit=20`)
    const data = await response.json()
    const results = data.results
    const next = data.next as string | null
    if(next){
        const nextData = await getAllPokemons(next)
        return [...results, ...nextData]
    }
    return results
    //validar tipado con Joi
}

const getAllTypes = async(nextURL:string | null):Promise<({name:string,url:string}[])> => {
    const response = await fetch(nextURL??`${urlBase}/type`)
    const data = await response.json()
    const results = data.results
    const next = data.next as string | null
    if(next){
        const nextData = await getAllTypes(next)
        return [...results, ...nextData]
    }
    return results
}

const getAllRegions = async(nextURL:string | null):Promise<({name:string,url:string}[])> => {
    const response = await fetch(nextURL??`${urlBase}/region`)
    const data = await response.json()
    const results = data.results
    const next = data.next as string | null
    if(next){
        const nextData = await getAllRegions(next)
        return [...results, ...nextData]
    }
    return results
}
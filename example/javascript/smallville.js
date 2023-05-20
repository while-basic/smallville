import { Smallville } from '../../javascript-adapter/dist/index.js'
import { agents } from './mechanics/agents.js'
import { updateAgent } from './mechanics/index.js';

console.log(Smallville)
const smallville = new Smallville({
    host: 'http://localhost:8080',
    stateHandler: (state) => {
        console.log(state)

        state.agents.forEach(agent => {
            updateAgent({
                name: agent.name,
                location: agent.location,
                activity: agent.action,
                emoji: agent.emoji
            })
        })
    }
});

const successful = await smallville.init()

if (successful) {
    startSimulation()
}

async function startSimulation() {
    /*****************************************
     *                                       *
     * Create locations and stateful objects *
     *                                       *
     *****************************************/
    await smallville.createLocation({
        name: 'Main Island',
    })

    await smallville.createLocation({
        name: 'Forest',
    })

    await smallville.createObject({
        parent: 'Main Island',
        name: 'Green House',
        state: 'empty'
    })

    await smallville.createObject({
        parent: 'Main Island',
        name: 'Red House',
        state: 'empty'
    })

    await smallville.createObject({
        parent: 'Forest',
        name: 'Campfire',
        state: 'on'
    })

    /********************************
     *                              *
     * Add the agents to the server *
     *                              *
     ********************************/
    agents.forEach(async (agent) => {
        console.log(agent)
        await smallville.createAgent({
            name: agent.name,
            location: agent.location,
            activity: agent.activity,
            memories: agent.memories
        })
    })
}

document.getElementById("smallville--next").addEventListener('click', function () {
    console.log("Pressed update state button")
    smallville.updateState()
});

await smallville.sync()
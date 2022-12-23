import addContext from 'mochawesome/addContext'
import './commands'
import 'cypress-mochawesome-reporter/register'

before(() => {
    Cypress.on(
        'uncaught:exception',
        (err, runnable) =>
            // returning false would prevent Cypress from failing the test
            false
    )
})

Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        const screenshot = `assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed) (attempt 2).png`
        addContext({ test }, screenshot)
    }
})

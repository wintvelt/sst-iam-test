// tests for the POST endpoint = create function
// tests only business logic, no persistent DB updates
import { handler } from '../../src/create';

const baseEvent = {
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sender: 'test client' })
}

test("Test make a post", async () => {
    const result = await handler(baseEvent)
    expect(result.statusCode).toBe(200)
    expect(result.body).toBe('hello from the cloud to test client')
})
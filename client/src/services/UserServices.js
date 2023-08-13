export async function getAllEvents() {
    const response = await fetch('/api/events');
    return await response.json();
}

export async function createEvent(data) {
    const response = await fetch(`/api/event`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({event: data})
    })
    return await response.json();
}

export async function deleteEvent(data) {
    const response = await fetch(`/api/eventdel`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({event: data})
    })
    return await response.json();
}

export async function editEvent(data) {
    const response = await fetch(`/api/event`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({event: data})
    })
    return await response.json();
}

export async function fetchSettings() {

    const response = await fetch('/api/settings');
    return await response.json();
}
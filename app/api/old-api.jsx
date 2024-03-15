export async function getData() {
    const response = await fetch('https://api.npoint.io/ee46484033b5d4d4658e')
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    return response.json()
  }

export async function getApps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PELORUS_API_URL}/sdp/apps?range=1w`)
    if (!response.ok) {
      throw new Error('Failed to fetch list of Apps from Pelorus')
    }
    return response.json()
  }
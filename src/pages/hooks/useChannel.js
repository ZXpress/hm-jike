import { getChannelAPI } from '@/apis/article'
import { useEffect, useState } from 'react'

function useChannel() {
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    async function fetchChannels() {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    fetchChannels()
  }, [])

  return { channelList }
}

export { useChannel }

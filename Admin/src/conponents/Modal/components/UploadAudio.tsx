import { FC, useEffect, useState } from "react"
import { Upload, Button, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"
import axios from "..//..//..//services/axiosInstance"

interface UploadAudioProps {
  setUrl: (url: string) => void
}

const UploadAudio: FC<UploadAudioProps> = ({ setUrl }) => {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  console.log("====================================")
  console.log("audioUrl >>>>>>>>>>", audioUrl)
  console.log("====================================")

  const beforeUpload = (file: File) => {
    const isAudio = file.type.startsWith("audio/")
    if (!isAudio) {
      message.error("You can only upload audio files!")
      return false
    }

    // Preview the audio file
    const audioURL = URL.createObjectURL(file)
    console.log("chay vo day de set")

    setAudioUrl(audioURL)
    setAudioFile(file)

    return false // Prevent automatic upload by Ant Design
  }

  useEffect(() => {
    if (audioUrl) {
      handleUpload()
    }
  }, [audioUrl])
  const handleUpload = async () => {
    if (!audioFile) {
      message.error("No audio file selected!")
      return
    }

    const formData = new FormData()
    formData.append("audio", audioFile)

    try {
      const response: any = await axios.post("/audio/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setUrl(response?.file.filename)

      message.success("Upload successful!")
    } catch (error) {
      message.error("Upload failed!")
    }
  }

  return (
    <div>
      <Upload beforeUpload={beforeUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Select Audio</Button>
      </Upload>

      {audioUrl && (
        <div>
          <p>Audio Preview:</p>
          <audio controls src={audioUrl}>
            Your browser does not support the audio tag.
          </audio>
        </div>
      )}
    </div>
  )
}

export default UploadAudio

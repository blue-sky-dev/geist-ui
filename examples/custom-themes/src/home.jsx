import React from 'react'
import { Card, Text, Tag, useTheme } from '@zeit-ui/react'

const Home = () => {
  const theme = useTheme()

  return (
    <Card shadow style={{ width: '500px', margin: '100px auto' }}>
      <Text>Modern and minimalist React UI library.</Text>
      <Text type={'success'}>
        Modern and minimalist React UI library. <Tag>{theme.palette.success}</Tag>
      </Text>
      <Text type={'warning'}>
        Modern and minimalist React UI library. <Tag>{theme.palette.warning}</Tag>
      </Text>
      <Text type={'error'}>
        Modern and minimalist React UI library. <Tag>{theme.palette.error}</Tag>
      </Text>
      <Text type={'secondary'}>Modern and minimalist React UI library.</Text>
    </Card>
  )
}

export default Home

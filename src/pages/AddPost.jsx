import React from 'react'
import  PostForm from '../component/Post-Form/PostForm'
import Container from '../component/Container/Container'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost
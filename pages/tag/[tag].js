// import Link from 'next/link'
import { useRouter } from 'next/router'


const Post = () => {
  const router = useRouter()
  const { tag } = router.query;
  //console.log("query",router.query);

  return <p>Tag: {tag}</p>
}

export default Post
import axios from "axios"
import Head from "next/head"
import { useState } from "react"
import Add from "../components/Add"
import AddButton from "../components/AddButton"
import Featured from "../components/Featured"
import styles from "../styles/Home.module.css"
import PizzaCard from "../components/PizzaCard"

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || ""
  let admin = false

  if (myCookie.token === process.env.TOKEN) {
    admin = true
  }

  const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`)
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  }
}

export default function Home({ pizzaList }) {
  const [close, setClose] = useState(true)

  return (
    <div>
      <Head>
        <title>Pizza Restaurant in New York</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon-1.png" />
      </Head>
      <Featured />
      {<AddButton setClose={setClose} />}
      <section className={styles.container}>
        <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit
          arcu in pretium molestie. Interdum et malesuada fames acme. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className={styles.wrapper}>
          {pizzaList.map((pizza) => (
            <PizzaCard key={pizza._id} pizza={pizza} />
          ))}
        </div>
      </section>
      {!close && <Add setClose={setClose} />}
    </div>
  )
}

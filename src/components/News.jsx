import { Select, Typography, Row, Col, Avatar, Card } from "antd"
import moment from "moment"

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi"

const {Text, Title} = Typography;
const {Option} = Select

const News = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const {data: cryptoNews} = useGetCryptoNewsQuery(count)
  console.log(cryptoNews);
  return (
    <div>News</div>
  )
}

export default News
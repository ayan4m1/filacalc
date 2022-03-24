import { Card } from 'react-bootstrap';

import Layout from 'components/Layout';

export default function Home() {
  return (
    <Layout>
      <Card body bg="light">
        <Card.Title>Welcome to Filacalc</Card.Title>
        <Card.Text>We provide utilities to help with 3D printing.</Card.Text>
      </Card>
    </Layout>
  );
}

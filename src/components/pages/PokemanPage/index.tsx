import { Button, Input, Pagination, Table } from 'antd';
import { PrimeContent, PrimeHeader } from 'pages/Home/styled';
import React, { useState } from 'react'
import { Heading, ListContainer, SearchWrapper } from './styled';
import { useSearchQuery } from 'queries/example';
import { Link } from 'react-router-dom';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const PokeManPage: React.FC = () => {

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  }

  //fetching pokeman record using reac-query hook
  const { data, isLoading, isError } = useSearchQuery(searchQuery, page);

  return (
    <>
    <PrimeHeader>
      <Link to={'/'}>Home</Link>
      <Link to={'/pokeman'}>Pokeman</Link>
      <Link to={'/canvas'}>Draw canvas</Link>
    </PrimeHeader>
    <PrimeContent>
      <ListContainer>
          <Heading>Pokeman Page</Heading>
          <SearchWrapper>
            <Input value={searchQuery} onChange={handleChange} placeholder='search pokeman' type="search" />
            <Button>Search</Button>
          </SearchWrapper>
          {
            isLoading ? <p>Loading</p>
            :
            <>
              <Table dataSource={dataSource} columns={columns}/>
              <Pagination 
              current={page}
              pageSize={10}
              total={dataSource.length}
              onChange={handlePageChange}
              />
            </>
          }
      </ListContainer>
    </PrimeContent>
    </>
  )
}

export default PokeManPage;
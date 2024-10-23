import { Button, Input, Pagination, Table } from 'antd';
import { PrimeContent, PrimeHeader } from 'pages/Home/styled';
import React, { useState } from 'react'
import { Heading, ListContainer, SearchWrapper } from './styled';
import { useSearchQuery } from 'queries/example';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'url',
    dataIndex: 'url',
    key: 'url',
  },
];

const PokeMonPage: React.FC = () => {

  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(20);
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  }

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageLimit(newPageSize)
  }

  //fetching pokemon record using react-query hook
  const { data, isLoading, isError } = useSearchQuery(searchQuery, page, pageLimit);

  return (
    <>
    <PrimeHeader>
      <Link to={'/'}>Home</Link>
      <Link to={'/pokeman'}>Pokemon</Link>
      <Link to={'/canvas'}>Draw canvas</Link>
    </PrimeHeader>
    <PrimeContent>
      <ListContainer>
          <Heading>Pokemon Page</Heading>
          <SearchWrapper>
            <Input value={searchQuery} onChange={handleChange} placeholder='search pokemon' type="search" />
            <Button>Search</Button>
          </SearchWrapper>
          {
            isLoading ? <p>Loading</p>
            :
            <>
              <Table 
              dataSource={data?.results} 
              columns={columns}
              rowKey={"name"}
              pagination={false}
              />
              <Pagination 
              current={page}
              pageSize={pageLimit}
              total={data?.count}
              align="center"
              pageSizeOptions={['20', '50', '100']}
              onChange={handlePageChange}
              style={{marginTop: "20px"}}
              />
            </>
          }
      </ListContainer>
    </PrimeContent>
    </>
  )
}

export default PokeMonPage;
import styled from "styled-components";

export const SearchWrapper = styled.section`
    display: flex;
    text-align: center;
    gap: 10px;
    margin-bottom: 1rem;
`;

export const ListContainer = styled.section`
    max-width: 1200px;
    margin: 1rem auto;

    @include breakpoint('mobile'){
        padding: 10px;
        max-width: 500px;
        overflow-x: auto;
    }
`;
export const Heading = styled.h1`
    font-size: 2.3rem;
    color: #4a90e2;
    text-align: center;
`;
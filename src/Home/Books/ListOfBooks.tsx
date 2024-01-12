import { List, Box, Spinner, Tr, Th, Td, Table } from "@chakra-ui/react";
import useGetAllBooks from "../../queries/getAllBooks";
import { ListBookDetail } from "../../types";
import ListBookRow
 from "./ListBookRow";
 import {useRecoilValue} from 'recoil';
import { authorSearch, genreSearch, titleSearch } from "../../atom/store";
import useAddToCart from "../../mutations/useAddToCart";

const ListOfBooks: React.FC =() => {
    const title = useRecoilValue(titleSearch);
    const author = useRecoilValue(authorSearch);
    const genre = useRecoilValue(genreSearch);
    let {data: bookDetails, isError, isFetching} = useGetAllBooks(title, author, genre);
    const { mutate: putToCart , isLoading: isMutating } = useAddToCart();
    console.log('what is bookdetails: ', bookDetails)

    if (isError) {
        bookDetails = []
    }

return(
   <>
   {isFetching ? <Spinner color='red.500' size='xl' /> : 
   <List>
        <Table>
            <Th>
                <Tr>
                    <Td>Title</Td>
                    <Td>Description</Td>
                    <Td>Author</Td>
                    <Td>Price</Td>
                    <Td>Genre</Td>
                    <Td>Add To Cart</Td>
                </Tr>
                {
                bookDetails && bookDetails.map((book, index: number) => (
                    <ListBookRow 
                        book={book}
                        onClick={(book) => {
                            console.log('do i get here: ', book.ID)
                            putToCart({
                                bookId: book.ID
                            });
                        } }
                        key={index}
                        ID={book.ID}
                        title={book.title}
                        description={book.description}
                        author={book.author}
                        price={book.price}
                        genre={book.genre} 
                        CreatedAt={book.CreatedAt} 
                        UpdatedAt={book.UpdatedAt} 
                        DeletedAt={book.DeletedAt}                    
                    />        
                ))
            }
            </Th>
        </Table>
    </List>
   }
   </> 
)

}

export default ListOfBooks;
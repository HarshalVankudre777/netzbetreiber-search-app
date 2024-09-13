import data from "./data/CompanyData.js";
import {useEffect, useState} from "react";
import {Button, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";

function App() {
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        // Function to filter and transform the data
        const filterAndTransformData = () => {
            const updatedData = data.map(item => ({
                ...item,
                email: item.email.toLowerCase()
            }));
            setFilteredData(updatedData);
        };

        filterAndTransformData();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredByName = filteredData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const copyEmail = (email) => {
        navigator.clipboard.writeText(email);
    };

    return (
        <div>

            <TableContainer maxWidth={'60%'}>
                <Input
                    className={'mt-3 mb-3'}
                    type="text"
                    placeholder="Search Netzbetreiber"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Table variant={'simple'} size={'sm'} className={'table table-sm table-bordered'}>
                    <Thead>
                    <Tr>
                        <Th>Netzbetreiber</Th>
                        <Th>Email</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {filteredByName.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.name}</Td>
                            <Td>{item.email}</Td>
                            <Td>
                                <Button size={'xs'} variant={'link'} colorScheme={'pink'}  onClick={() => copyEmail(item.email)}>
                                    Copy Email
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
            </TableContainer>

        </div>
    );
}

export default App

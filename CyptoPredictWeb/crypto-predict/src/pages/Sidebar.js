import React from 'react'
import {
    Box,
    Image,
    Button,
    Flex,
    HStack,
    useDisclosure,
    Link
} from '@chakra-ui/react'

const names = ['Dashboard', 'Noticias', 'Ajustes']
const icons = ['/icons/dashboard.png', '/icons/news.png', '/icons/settings.png']
const links = ['dashboard', 'noticias', 'ajustes']

const menuItems = names.map((name, index) => ({
    name: name,
    icon: icons[index],
    link: links[index]
}))

const SideBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    function onClick() {
        console.log("cierra sesion")
    }

    return (
        <>
            {/* SideBar */}
            <Box
                alignItems='center'
                w={[0, 0, '30%', '20%', '25%']}
                h='100vh'
                display={{ base: 'none', md: 'flex' }}
                bgGradient='linear(to-t,#1294FF, #022C4F)'
                flexDirection='column'
                justifyContent='space-between'
            >
                <Box
                    w='100%'
                    m={5}
                    pt={5}
                >
                    <Image
                        src='/images/Logo.jpg'
                        alt='CryptoPredict Logo'
                        borderRadius='20px'
                        // boxSize='40%'
                        w='25%'
                        display='block'
                        m='auto'
                    />
                </Box>
                <HStack
                    spacing={8}
                    alignItems={'center'}
                >
                    <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}
                        flex={1}
                        flexDirection='column'
                        m={5}
                        alignContent='center'
                        justifyContent='center'
                    >
                        {menuItems.map((item, index) => (
                            <Box
                                key={index}
                                w='100%'
                                mt={10}
                                mb={10}
                                pl={[0, 0, 3, 4]}
                                pr={[0, 0, 3, 4]}
                                display='flex'
                                flexDirection='row'
                                _hover={{ opacity: '0.4' }}
                                transition='0.3s'
                            >
                                <Image
                                    w={[0, 0, 7, 8, 10]}
                                    src={item.icon} />
                                <Link
                                    key={index}
                                    pl={5}
                                    fontWeight={650}
                                    fontSize={[0, 0, 13, 14, 15]}
                                    alignContent='center'
                                    href={item.link}
                                >
                                    {item.name}
                                </Link>
                            </Box>
                        ))}
                    </HStack>
                </HStack>
                <Box
                    alignContent='center'
                    w='100%'
                    mb={5}
                >
                    <Button
                        // fontSize={[0, 0, 12, 15, 15]}
                        fontSize={{ md: 15, xl: 18 }}

                        bg='#FFA000'
                        w="70%"
                        h={{ base: '35', lg: '45' }}

                        color='black'
                        _hover={{ bg: '#D84226' }}
                        transition='0.3s'
                        onClick={onClick}
                    >
                        Cerrar Sesión
                    </Button>
                </Box>
            </Box>



            {/* PopBar */}
            <Box
                display={{ md: 'none' }}
                bgGradient='linear(to-r,#1294FF, #022C4F)'
                px={4}
            >
                <Flex
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    p={5}
                >
                    <Flex>
                        {isOpen ?
                            <Image
                                src='/icons/close.png'
                                alt='Close'
                                w={{ base: '50%' }}
                                onClick={isOpen ? onClose : onOpen}
                                display='block'
                                m='auto'
                                _hover={{ opacity: '0.5' }}
                            >
                            </Image>
                            :
                            <Image
                                src='/icons/menu.png'
                                alt='Menu'
                                w={20}
                                onClick={isOpen ? onClose : onOpen}
                                display='block'
                                m='auto'
                                _hover={{ opacity: '0.5' }}
                            >
                            </Image>
                        }
                    </Flex>
                    <Flex
                        display={{ md: 'none' }}
                    >
                        <Image
                            src='/images/Logo.jpg'
                            alt='CryptoPredict Logo'
                            borderRadius={['10px', '20px']}
                            w='15%'
                            display='block'
                            m='auto'
                        />
                    </Flex>
                    <Flex
                        display={{ md: 'none' }}
                    >
                        <Image
                            src='/icons/logout.png'
                            alt='Logout'
                            w={20}
                            display='block'
                            m='auto'
                            _hover={{ opacity: '0.5' }}
                            onClick={onClick}
                        />
                    </Flex>
                </Flex>
                {isOpen ? (
                    <Box
                        borderRadius='20px'
                        m={3}
                        w={{ base: '60%', sm: '50%' }}
                        display={{ md: 'none' }}
                        bg='#ffffff'
                        position='absolute'
                        zIndex={1000}

                    >
                        <HStack
                            spacing={8}
                        >
                            <HStack
                                as={'nav'}
                                spacing={10}
                                flex={1}
                                display='flex'
                                flexDirection='column'
                                m={5}
                            >
                                {menuItems.map((item, index) => (
                                    <Box>
                                        <Link
                                            key={index}
                                            fontWeight={650}
                                            fontSize={[15, 18, 20]}
                                            href={item.link}
                                            color='#085799'
                                        >
                                            {item.name}
                                        </Link>
                                    </Box>
                                ))}
                            </HStack>
                        </HStack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}

export default SideBar
import React, { FC, ReactElement, useRef, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    StatusBar,
    SafeAreaView
} from 'react-native';
import { Icon } from 'react-native-elements';

interface Props {
    label: string;
    data: Array<{ label: string; value: string }>;
    onSelect: (item: { label: string; value: string }) => void;
}

const Dropdown: FC<Props> = ({ label, data, onSelect }) => {
    const DropdownButton = useRef();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(undefined);
    const [dropdownTop, setDropdownTop] = useState(0);

    const toggleDropdown = (): void => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = (): void => {
        DropdownButton.current.measure((_fx: number, _fy: number, _w: number, h: number, _px: number, py: number) => {
            setDropdownTop(py + h);
        });
        setVisible(true);
    };

    const onItemPress = (item: any): void => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = ({ item }: any): ReactElement<any, any> => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <Text>{item.label}</Text>
        </TouchableOpacity>
    );

    const renderDropdown = (): ReactElement<any, any> => {
        return (
            <Modal visible={visible} transparent animationType="none">
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <SafeAreaView style={styles.container} >
                        <ScrollView style={styles.scrollView}>
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </ScrollView>
                    </SafeAreaView>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <TouchableOpacity
            ref={DropdownButton}
            style={styles.button}
            onPress={toggleDropdown}
        >
            {renderDropdown()}
            <Text style={styles.buttonText}>
                {(!!selected && selected.label) || label}
            </Text>
            <Icon style={styles.icon} type="font-awesome" name="chevron-down" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        position: 'relative',
        backgroundColor: '#fff',
        width: '100%',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#efefef',
        height: 50,
        zIndex: 1,
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
    },
    icon: {
        marginRight: 10,
    },
    /*
    dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
    },
    */
    overlay: {
        width: '100%',
        height: '100%',
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    scrollView: {
        marginHorizontal: 20,
    },
});

export default Dropdown;
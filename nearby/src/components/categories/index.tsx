
import { FlatList } from 'react-native'
import { s } from './styles'
import { colors } from '@/styles/theme'
import { Category } from '../category'

export type CategoriesProps = {
    id: string
    name: string
} []

type Props = {
    data: CategoriesProps
    selected: string
    onSelect: (id: string) => void
}

export function Categories({ data, selected, onSelect }: Props) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Category 
                    name={item.name} 
                    iconId={item.id} 
                    onPress={() => onSelect(item.id)}
                    isSelected={selected === item.id}
                />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.content}
            style={s.container}
            />
    )
}

const ListItem = ({ title }) => {
    return (
        <ul className="flex items-center gap-3">
            <li className="font-semibold">
                <a
                    href={`#${title.replace(/\s+/g, '')}`}
                    className="hover:border-b-2 text-white hover:text-emerald-500 hover:pb-1 transition-all"
                >
                    {title}
                </a>
            </li>
        </ul>
    )
}

export default ListItem

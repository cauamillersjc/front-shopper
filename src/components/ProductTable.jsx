import { Table } from "react-bootstrap"

export const ProductTable = ({ products }) => {
    return (
        <div className="p-5">
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Preço Atual</th>
                        <th>Novo Preço</th>
                        <th>Erros</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>{product.sales_price}</td>
                            <td>{product.new_price}</td>
                            <td className="text-danger">{product.message}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import { BookService } from "../Services/BookService";
import { AuthorService } from "../Services/AuthorService";
import { CategoryService } from "../Services/CategoryService";
import { PublisherService } from "../Services/PublisherService";

export default function AdminDashboard() {
  const [booksCount, setBooksCount] = useState(0);
  const [authorsCount, setAuthorsCount] = useState(0);
  const [publishersCount, setPublishersCount] = useState(0);
  const [categoryData, setCategoryData] = useState<
    { name: string; value: number }[]
  >([]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#dc3545",
    "#20c997",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setBooksCount(await BookService.CountBooks());
      setAuthorsCount(await AuthorService.CountAuthors());
      setPublishersCount(await PublisherService.CountPublishers());

      const categories = await CategoryService.GetBooksByCategory();
      const totalBooks = categories.reduce((sum, c) => sum + c.value, 0);
      setCategoryData(
        categories.map((c) => ({
          name: c.name,
          value: parseFloat(((c.value / totalBooks) * 100).toFixed(2)),
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>

      {/* Cards për Books, Authors dhe Publishers */}
      <Row className="mb-4">
        <Col md={4}>
          <Card
            className="shadow-sm border-0"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <Card.Body>
              <Card.Title>
                <BookIcon style={{ marginRight: "8px" }} /> Total Books
              </Card.Title>
              <h3>{booksCount}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="shadow-sm border-0"
            style={{ backgroundColor: "#198754", color: "white" }}
          >
            <Card.Body>
              <Card.Title>
                <PeopleIcon style={{ marginRight: "8px" }} /> Total Authors
              </Card.Title>
              <h3>{authorsCount}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="shadow-sm border-0"
            style={{ backgroundColor: "#6f42c1", color: "white" }}
          >
            <Card.Body>
              <Card.Title>
                <LibraryBooksIcon style={{ marginRight: "8px" }} /> Total
                Publishers
              </Card.Title>
              <h3>{publishersCount}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* PieChart për përqindjen e kategorive */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Books by Category (%)
              </Card.Title>
              <div style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={130}
                      label={({ name, value }) => `${name}: ${value}%`}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}






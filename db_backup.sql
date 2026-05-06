--
-- PostgreSQL database dump
--

\restrict Y5Tk2WIpXUIxvPjV8MNW3Yd0bbsCiA3HqTRBpn71KDHD7eWvBT1EDOboT3bu342

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-06 09:15:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 49158)
-- Name: material_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.material_types (
    id integer NOT NULL,
    type_name character varying(40),
    losses_percent numeric(5,2)
);


ALTER TABLE public.material_types OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 49157)
-- Name: material_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.material_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.material_types_id_seq OWNER TO postgres;

--
-- TOC entry 5010 (class 0 OID 0)
-- Dependencies: 219
-- Name: material_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.material_types_id_seq OWNED BY public.material_types.id;


--
-- TOC entry 222 (class 1259 OID 49166)
-- Name: materials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.materials (
    id integer NOT NULL,
    material_name character varying(40),
    type_id integer,
    unit_price numeric(10,2),
    stock_quantity numeric(10,3),
    min_quantity numeric(10,3),
    package_quantity numeric(10,3),
    measurement_unit character varying(10)
);


ALTER TABLE public.materials OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 49165)
-- Name: materials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.materials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.materials_id_seq OWNER TO postgres;

--
-- TOC entry 5011 (class 0 OID 0)
-- Dependencies: 221
-- Name: materials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.materials_id_seq OWNED BY public.materials.id;


--
-- TOC entry 228 (class 1259 OID 49200)
-- Name: materials_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.materials_products (
    id integer NOT NULL,
    material_id integer,
    product_id integer,
    material_amount_per_production numeric(5,3)
);


ALTER TABLE public.materials_products OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 49199)
-- Name: materials_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.materials_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.materials_products_id_seq OWNER TO postgres;

--
-- TOC entry 5012 (class 0 OID 0)
-- Dependencies: 227
-- Name: materials_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.materials_products_id_seq OWNED BY public.materials_products.id;


--
-- TOC entry 224 (class 1259 OID 49179)
-- Name: product_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_types (
    id integer NOT NULL,
    type_name character varying(40),
    coefficient numeric(5,2)
);


ALTER TABLE public.product_types OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 49178)
-- Name: product_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_types_id_seq OWNER TO postgres;

--
-- TOC entry 5013 (class 0 OID 0)
-- Dependencies: 223
-- Name: product_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_types_id_seq OWNED BY public.product_types.id;


--
-- TOC entry 226 (class 1259 OID 49187)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    article character varying(20),
    type_id integer,
    product_name character varying(40),
    min_price_for_partners numeric(10,2)
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 49186)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 5014 (class 0 OID 0)
-- Dependencies: 225
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 4829 (class 2604 OID 49161)
-- Name: material_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.material_types ALTER COLUMN id SET DEFAULT nextval('public.material_types_id_seq'::regclass);


--
-- TOC entry 4830 (class 2604 OID 49169)
-- Name: materials id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials ALTER COLUMN id SET DEFAULT nextval('public.materials_id_seq'::regclass);


--
-- TOC entry 4833 (class 2604 OID 49203)
-- Name: materials_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials_products ALTER COLUMN id SET DEFAULT nextval('public.materials_products_id_seq'::regclass);


--
-- TOC entry 4831 (class 2604 OID 49182)
-- Name: product_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_types ALTER COLUMN id SET DEFAULT nextval('public.product_types_id_seq'::regclass);


--
-- TOC entry 4832 (class 2604 OID 49190)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4996 (class 0 OID 49158)
-- Dependencies: 220
-- Data for Name: material_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.material_types (id, type_name, losses_percent) FROM stdin;
1	Зеленый чай	0.10
2	Черный чай	0.12
3	Травяная добавка	0.18
4	Фруктовая добавка	0.20
5	Цветочная добавка	0.16
6	Пряность	0.08
7	Натуральный ароматизатор	0.14
8	Фильтр-пакет	0.03
9	Упаковка	0.05
10	Этикетка	0.02
\.


--
-- TOC entry 4998 (class 0 OID 49166)
-- Dependencies: 222
-- Data for Name: materials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.materials (id, material_name, type_id, unit_price, stock_quantity, min_quantity, package_quantity, measurement_unit) FROM stdin;
3	Ганпаудер	1	1210.00	47.200	15.000	8.000	кг
2	Жасминовый зеленый чай	1	1360.00	52.800	16.000	8.000	кг
1	Сенча классическая	1	1180.00	84.500	25.000	10.000	кг
6	Эрл Грей база	2	1125.00	65.300	20.000	10.000	кг
5	Цейлонский крупнолистовой	2	1045.00	88.000	28.000	10.000	кг
4	Ассам байховый	2	980.00	110.000	35.000	12.000	кг
10	Лист смородины	3	870.00	12.000	4.000	2.000	кг
9	Ромашка аптечная	3	930.00	14.400	4.000	2.000	кг
8	Мелисса сушеная	3	810.00	16.200	5.000	2.000	кг
7	Мята перечная сушеная	3	760.00	18.500	6.000	2.000	кг
14	Малина сублимированная	4	1680.00	7.200	2.500	1.000	кг
13	Клубника сублимированная	4	1540.00	9.600	3.000	1.000	кг
12	Апельсиновая цедра	4	690.00	19.800	6.000	2.000	кг
11	Яблоко сушеное кубик	4	520.00	26.700	8.000	2.000	кг
17	Бутоны лаванды	5	1380.00	5.900	2.000	1.000	кг
16	Цветы жасмина	5	1490.00	6.400	2.000	1.000	кг
15	Лепестки розы	5	1240.00	8.800	3.000	1.000	кг
19	Имбирь сушеный	6	560.00	10.200	3.000	1.000	кг
18	Корица дробленая	6	480.00	11.500	3.500	1.000	кг
21	Натуральный аромат ванили	7	1920.00	3.900	1.200	0.500	л
20	Натуральный аромат бергамота	7	1850.00	4.600	1.500	0.500	л
22	Фильтр-пакет 2 г	8	1.20	8200.000	2500.000	1000.000	шт
25	Банка жестяная 100 г	9	46.00	430.000	120.000	40.000	шт
24	Коробка подарочная малая	9	28.00	580.000	180.000	50.000	шт
23	Конверт крафтовый	9	6.40	2400.000	700.000	250.000	шт
27	Этикетка фирменная черная	10	2.80	3400.000	1000.000	500.000	шт
26	Этикетка фирменная зеленая	10	2.80	3600.000	1000.000	500.000	шт
\.


--
-- TOC entry 5004 (class 0 OID 49200)
-- Dependencies: 228
-- Data for Name: materials_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.materials_products (id, material_id, product_id, material_amount_per_production) FROM stdin;
47	9	23	0.030
46	6	23	0.060
45	26	22	1.000
44	24	22	1.000
43	25	22	2.000
42	4	22	0.060
41	1	22	0.060
40	23	21	1.000
39	26	21	1.000
38	22	21	20.000
37	2	21	0.040
36	23	20	1.000
35	27	20	1.000
34	22	20	20.000
33	4	20	0.040
6	23	13	1.000
5	27	13	1.000
4	4	13	0.080
3	23	12	1.000
2	26	12	1.000
1	1	12	0.080
7	6	14	0.078
32	23	19	1.000
31	26	19	1.000
30	14	19	0.003
29	13	19	0.003
28	1	19	0.074
27	23	18	1.000
26	27	18	1.000
25	19	18	0.001
24	12	18	0.004
23	5	18	0.075
14	23	15	1.000
13	26	15	1.000
12	16	15	0.002
11	2	15	0.080
10	23	14	1.000
9	27	14	1.000
8	20	14	0.002
22	23	17	1.000
21	26	17	1.000
20	17	17	0.002
19	9	17	0.060
18	23	16	1.000
17	26	16	1.000
16	8	16	0.040
15	7	16	0.040
50	27	23	1.000
49	24	23	1.000
48	25	23	2.000
64	23	26	1.000
63	27	26	1.000
62	5	26	0.080
68	23	27	1.000
67	27	27	1.000
66	21	27	0.002
65	4	27	0.078
71	23	28	1.000
70	26	28	1.000
69	10	28	0.080
76	23	29	1.000
75	27	29	1.000
74	22	29	20.000
73	12	29	0.002
72	5	29	0.038
61	23	25	1.000
60	26	25	1.000
59	15	25	0.002
58	11	25	0.004
57	1	25	0.072
56	23	24	1.000
55	27	24	1.000
54	21	24	0.001
53	19	24	0.002
52	18	24	0.003
51	4	24	0.073
\.


--
-- TOC entry 5000 (class 0 OID 49179)
-- Dependencies: 224
-- Data for Name: product_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_types (id, type_name, coefficient) FROM stdin;
1	Листовой чай	1.00
2	Ароматизированный чай	1.12
3	Травяной сбор	0.95
4	Подарочный набор	1.25
5	Пакетированный чай	0.85
6	Сезонная коллекция	1.18
\.


--
-- TOC entry 5002 (class 0 OID 49187)
-- Dependencies: 226
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, article, type_id, product_name, min_price_for_partners) FROM stdin;
26	TEA-015	\N	Чай «Цейлон Голд»	325.00
13	TEA-002	\N	Чай «Ассам классик»	310.00
12	TEA-001	\N	Чай «Утренняя сенча»	340.00
27	TEA-016	\N	Чай «Ванильный Ассам»	365.00
19	TEA-008	\N	Чай «Ягодный сад»	410.00
18	TEA-007	\N	Чай «Цитрусовый закат»	375.00
15	TEA-004	\N	Чай «Жасминовый сад»	390.00
14	TEA-003	\N	Чай «Бергамотовый вечер»	360.00
28	TEA-017	\N	Сбор «Смородиновый лист»	300.00
17	TEA-006	\N	Сбор «Ромашковый уют»	290.00
16	TEA-005	\N	Сбор «Мята и мелисса»	280.00
23	TEA-012	\N	Набор «Теплый вечер»	1120.00
22	TEA-011	\N	Набор «Чайная церемония»	980.00
29	TEA-018	\N	Чай в пакетиках «Citrus Mix»	255.00
21	TEA-010	\N	Чай в пакетиках «Jasmine Green»	265.00
20	TEA-009	\N	Чай в пакетиках «English Breakfast»	245.00
25	TEA-014	\N	Чай «Летний сад»	420.00
24	TEA-013	\N	Чай «Зимние специи»	430.00
\.


--
-- TOC entry 5015 (class 0 OID 0)
-- Dependencies: 219
-- Name: material_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.material_types_id_seq', 10, true);


--
-- TOC entry 5016 (class 0 OID 0)
-- Dependencies: 221
-- Name: materials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.materials_id_seq', 27, true);


--
-- TOC entry 5017 (class 0 OID 0)
-- Dependencies: 227
-- Name: materials_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.materials_products_id_seq', 76, true);


--
-- TOC entry 5018 (class 0 OID 0)
-- Dependencies: 223
-- Name: product_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_types_id_seq', 6, true);


--
-- TOC entry 5019 (class 0 OID 0)
-- Dependencies: 225
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 29, true);


--
-- TOC entry 4835 (class 2606 OID 49164)
-- Name: material_types material_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.material_types
    ADD CONSTRAINT material_types_pkey PRIMARY KEY (id);


--
-- TOC entry 4837 (class 2606 OID 49172)
-- Name: materials materials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_pkey PRIMARY KEY (id);


--
-- TOC entry 4843 (class 2606 OID 49206)
-- Name: materials_products materials_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials_products
    ADD CONSTRAINT materials_products_pkey PRIMARY KEY (id);


--
-- TOC entry 4839 (class 2606 OID 49185)
-- Name: product_types product_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_types
    ADD CONSTRAINT product_types_pkey PRIMARY KEY (id);


--
-- TOC entry 4841 (class 2606 OID 49193)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4846 (class 2606 OID 49207)
-- Name: materials_products materials_products_material_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials_products
    ADD CONSTRAINT materials_products_material_id_fkey FOREIGN KEY (material_id) REFERENCES public.materials(id);


--
-- TOC entry 4847 (class 2606 OID 49212)
-- Name: materials_products materials_products_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials_products
    ADD CONSTRAINT materials_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 4844 (class 2606 OID 49173)
-- Name: materials materials_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.material_types(id);


--
-- TOC entry 4845 (class 2606 OID 49194)
-- Name: products products_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.product_types(id);


-- Completed on 2026-05-06 09:15:32

--
-- PostgreSQL database dump complete
--

\unrestrict Y5Tk2WIpXUIxvPjV8MNW3Yd0bbsCiA3HqTRBpn71KDHD7eWvBT1EDOboT3bu342


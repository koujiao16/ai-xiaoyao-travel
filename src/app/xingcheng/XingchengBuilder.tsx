"use client";

import "./xingcheng.css";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { LibraryItem } from "@/lib/xingcheng/types";
import { routeName } from "@/data/xingcheng/library";
import { NO_LODGING_LABEL } from "@/data/xingcheng/accommodations";


const PRIORITY_ATTRACTION_IMAGES = new Set(["city-wall", "terracotta", "huashan"]);

type DayPlan = {
  id: number;
  items: string[];
  query: string;
  touched: boolean;
  meals: string[];
  lodging: string;
  photoItems: string[];
};

const initialDays: DayPlan[] = [
  { id: 1, items: ["pickup"], query: "", touched: false, meals: [], lodging: "西安", photoItems: [] },
  { id: 2, items: ["city-wall", "huashan"], query: "", touched: false, meals: ["早餐"], lodging: "西安", photoItems: [] },
  { id: 3, items: ["dropoff"], query: "", touched: false, meals: ["早餐"], lodging: NO_LODGING_LABEL, photoItems: [] },
];

type Props = {
  library: LibraryItem[];
  lodgingOptions: string[];
  dataSource?: "supabase" | "local";
};

export function XingchengBuilder({ library, lodgingOptions, dataSource = "local" }: Props) {
  const [tripName, setTripName] = useState("西安华山3日游");
  const safeLibrary = useMemo(() => (library.length ? library : []), [library]);
  const safeLodging = useMemo(
    () => (lodgingOptions.length ? lodgingOptions : [NO_LODGING_LABEL]),
    [lodgingOptions],
  );
  const [days, setDays] = useState<DayPlan[]>(initialDays);
  const [feeIncluded, setFeeIncluded] = useState("");
  const [feeExcluded, setFeeExcluded] = useState("");
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState("");
  const [brokenImages, setBrokenImages] = useState<Record<string, true>>({});
  const dragRef = useRef<{ dayId: number; itemId: string } | null>(null);

  const emptyDay = (id: number): DayPlan => ({
    id,
    items: [],
    query: "",
    touched: false,
    meals: [],
    lodging: id === 1 ? (safeLodging.find((x) => x !== NO_LODGING_LABEL) || "西安") : NO_LODGING_LABEL,
    photoItems: [],
  });

  const itemById = useMemo(
    () => Object.fromEntries(safeLibrary.map((item) => [item.id, item])),
    [safeLibrary],
  );

  const updateDay = (id: number, patch: Partial<DayPlan>) => {
    setDays((current) => current.map((day) => (day.id === id ? { ...day, ...patch } : day)));
  };

  const setDayCount = (count: number) => {
    setDays((current) =>
      Array.from({ length: count }, (_, index) => current[index] ?? emptyDay(index + 1)),
    );
  };

  const suggestionsFor = (day: DayPlan) => {
    const query = day.query.trim().toLowerCase();
    if (!query) return [];
    return safeLibrary
      .filter((item) => !day.items.includes(item.id))
      .filter((item) =>
        [item.name, ...item.keywords].some((keyword) => keyword.toLowerCase().includes(query)),
      )
      .slice(0, 6);
  };

  const addItem = (day: DayPlan, itemId: string) => {
    updateDay(day.id, { items: [...day.items, itemId], query: "", touched: false });
  };

  const removeItem = (day: DayPlan, itemId: string) => {
    updateDay(day.id, {
      items: day.items.filter((id) => id !== itemId),
      photoItems: day.photoItems.filter((id) => id !== itemId),
    });
  };

  const toggleMeal = (day: DayPlan, meal: string) => {
    const meals = day.meals.includes(meal)
      ? day.meals.filter((value) => value !== meal)
      : [...day.meals, meal];
    updateDay(day.id, { meals });
  };

  const togglePhoto = (day: DayPlan, itemId: string) => {
    if (day.photoItems.includes(itemId)) {
      updateDay(day.id, { photoItems: day.photoItems.filter((id) => id !== itemId) });
      return;
    }
    if (day.photoItems.length >= 3) {
      setMessage(`Day${day.id}最多只能选择3张景区图片`);
      return;
    }
    updateDay(day.id, { photoItems: [...day.photoItems, itemId] });
    setMessage("");
  };

  const dropItem = (day: DayPlan, targetId: string) => {
    const dragging = dragRef.current;
    if (!dragging || dragging.dayId !== day.id || dragging.itemId === targetId) return;
    const next = [...day.items];
    const from = next.indexOf(dragging.itemId);
    const to = next.indexOf(targetId);
    next.splice(from, 1);
    next.splice(to, 0, dragging.itemId);
    updateDay(day.id, { items: next });
    dragRef.current = null;
  };

  const validate = () => {
    const hasName = tripName.trim().length > 0;
    const nextDays = days.map((day) => ({
      ...day,
      touched: day.query.trim().length > 0 || day.items.length === 0,
    }));
    setDays(nextDays);
    if (!hasName) {
      setMessage("请先填写行程名称");
      return false;
    }
    if (nextDays.some((day) => day.query.trim().length > 0 || day.items.length === 0)) {
      setMessage("有景点尚未从联想结果中确认，请检查红色输入框");
      setTimeout(() => document.querySelector(".field-error")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
      return false;
    }
    setMessage("");
    return true;
  };

  const exportDocx = async () => {
    if (!validate()) return;
    setExporting(true);
    try {
      const {
        AlignmentType,
        BorderStyle,
        Document,
        ImageRun,
        Packer,
        Paragraph,
        ShadingType,
        Table,
        TableCell,
        TableLayoutType,
        TableRow,
        TextRun,
        WidthType,
      } = await import("docx");

      const photoBuffers = new Map<string, ArrayBuffer>();
      const photoIds = [...new Set(days.flatMap((day) => day.photoItems))];
      const webpToJpeg = async (buffer: ArrayBuffer) => {
        const bitmap = await createImageBitmap(new Blob([buffer], { type: "image/webp" }));
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("图片转换失败");
        context.drawImage(bitmap, 0, 0);
        const jpeg = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("图片转换失败"))), "image/jpeg", 0.86);
        });
        return jpeg.arrayBuffer();
      };
      await Promise.all(
        photoIds.map(async (id) => {
          const item = itemById[id];
          if (!item?.image) return;
          const response = await fetch(item.image);
          if (!response.ok) throw new Error("图片读取失败");
          const raw = await response.arrayBuffer();
          photoBuffers.set(id, item.image.endsWith(".webp") ? await webpToJpeg(raw) : raw);
        }),
      );

      const border = { style: BorderStyle.SINGLE, size: 10, color: "C8B6A4" };
      const zeroSpacing = { before: 0, after: 0, line: 240 };
      const tableSeparator = () =>
        new Paragraph({
          spacing: { before: 0, after: 0, line: 1 },
          children: [new TextRun({ text: "", size: 1 })],
        });
      const formatLodgingLabel = (lodging: string) => (lodging === "不住宿" ? "不住宿" : `住：${lodging}`);
      const feeBodyParagraphs = (text: string) => {
        const lines = text.trim() ? text.replace(/\r\n/g, "\n").split("\n") : ["暂无说明"];
        return lines.map(
          (line) =>
            new Paragraph({
              spacing: zeroSpacing,
              children: [new TextRun({ text: line.length ? line : " " })],
            }),
        );
      };
      const buildFeeTable = (title: string, text: string) =>
        new Table({
          width: { size: 10000, type: WidthType.DXA },
          layout: TableLayoutType.FIXED,
          columnWidths: [10000],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 10000, type: WidthType.DXA },
                  borders: { top: border, bottom: border, left: border, right: border },
                  shading: { fill: "8B3E2F", type: ShadingType.CLEAR },
                  margins: { top: 170, bottom: 170, left: 200, right: 200 },
                  children: [
                    new Paragraph({
                      spacing: zeroSpacing,
                      children: [new TextRun({ text: title, bold: true, size: 27, color: "FFFFFF" })],
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 10000, type: WidthType.DXA },
                  borders: { top: border, bottom: border, left: border, right: border },
                  margins: { top: 140, bottom: 140, left: 200, right: 200 },
                  children: feeBodyParagraphs(text),
                }),
              ],
            }),
          ],
        });

      const summaryColumnWidths = [900, 5200, 2000, 1900];
      const summaryTable = new Table({
        width: { size: 10000, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        columnWidths: summaryColumnWidths,
        rows: [
          new TableRow({
            children: [
              new TableCell({
                columnSpan: 4,
                width: { size: 10000, type: WidthType.DXA },
                borders: { top: border, bottom: border, left: border, right: border },
                shading: { fill: "8B3E2F", type: ShadingType.CLEAR },
                margins: { top: 170, bottom: 170, left: 200, right: 200 },
                children: [
                  new Paragraph({
                    spacing: zeroSpacing,
                    children: [new TextRun({ text: "简版行程安排", bold: true, size: 27, color: "FFFFFF" })],
                  }),
                ],
              }),
            ],
          }),
          ...days.map((day) => {
            const selected = day.items
              .map((id) => itemById[id])
              .filter((item): item is NonNullable<typeof item> => Boolean(item));
            const route = selected.map((item) => routeName(item)).join(" → ") || "待安排";
            const meals = day.meals.length ? day.meals.join("、") : "不含餐";
            return new TableRow({
              children: [
                new TableCell({
                  width: { size: summaryColumnWidths[0], type: WidthType.DXA },
                  borders: { top: border, bottom: border, left: border, right: border },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      spacing: zeroSpacing,
                      children: [new TextRun({ text: `D${day.id}`, bold: true })],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: summaryColumnWidths[1], type: WidthType.DXA },
                  borders: { top: border, bottom: border, left: border, right: border },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      spacing: zeroSpacing,
                      children: [new TextRun({ text: route })],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: summaryColumnWidths[2], type: WidthType.DXA },
                  borders: { top: border, bottom: border, left: border, right: border },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      spacing: zeroSpacing,
                      children: [new TextRun({ text: meals })],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: summaryColumnWidths[3], type: WidthType.DXA },
                  borders: { top: border, bottom: border, left: border, right: border },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      spacing: zeroSpacing,
                      children: [new TextRun({ text: formatLodgingLabel(day.lodging) })],
                    }),
                  ],
                }),
              ],
            });
          }),
        ],
      });

      const children: Array<InstanceType<typeof Paragraph> | InstanceType<typeof Table>> = [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: tripName.trim(), bold: true, size: 36, color: "2E2924" })],
        }),
        summaryTable,
      ];

      days.forEach((day) => {
        const selected = day.items
          .map((id) => itemById[id])
          .filter((item): item is NonNullable<typeof item> => Boolean(item));
        const detailContent: Array<InstanceType<typeof Paragraph> | InstanceType<typeof Table>> = [];

        const narrativeRuns: InstanceType<typeof TextRun>[] = [];
        selected.forEach((item, index) => {
          narrativeRuns.push(new TextRun({ text: `【${item.name}】`, bold: true, color: "8B3E2F" }));
          if (item.seasonal) {
            narrativeRuns.push(new TextRun({ text: `（${item.seasonal}）`, bold: true, color: "54745E" }));
          }
          if (item.duration) {
            narrativeRuns.push(new TextRun({ text: `（游览${item.duration}）`, bold: true, color: "37322E" }));
          }
          narrativeRuns.push(new TextRun({ text: item.description, color: "37322E" }));
          if (index < selected.length - 1) {
            narrativeRuns.push(new TextRun({ text: "；", color: "37322E" }));
          }
        });
        detailContent.push(
          new Paragraph({
            spacing: { before: 60, after: 60, line: 360 },
            children: narrativeRuns.length
              ? narrativeRuns
              : [new TextRun({ text: "当天行程待安排。", color: "37322E" })],
          }),
        );

        const dayPhotos = day.photoItems
          .map((id) => itemById[id])
          .filter((item) => item?.image && photoBuffers.has(item.id))
          .slice(0, 3);
        if (dayPhotos.length) {
          const imageWidth = dayPhotos.length === 1 ? 420 : dayPhotos.length === 2 ? 260 : 165;
          const imageHeight = Math.round(imageWidth * 0.64);
          detailContent.push(
            new Paragraph({
              spacing: { before: 180, after: 100 },
              children: [new TextRun({ text: "行程图片", bold: true, color: "8B3E2F" })],
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: dayPhotos.map((item) =>
                    new TableCell({
                      width: { size: Math.floor(100 / dayPhotos.length), type: WidthType.PERCENTAGE },
                      borders: {
                        top: { style: BorderStyle.SINGLE, size: 6, color: "E3D8CD" },
                        bottom: { style: BorderStyle.SINGLE, size: 6, color: "E3D8CD" },
                        left: { style: BorderStyle.SINGLE, size: 6, color: "E3D8CD" },
                        right: { style: BorderStyle.SINGLE, size: 6, color: "E3D8CD" },
                      },
                      margins: { top: 100, bottom: 100, left: 80, right: 80 },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new ImageRun({
                              type: "jpg",
                              data: photoBuffers.get(item.id)!,
                              transformation: { width: imageWidth, height: imageHeight },
                            }),
                          ],
                        }),
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          spacing: { before: 70 },
                          children: [new TextRun({ text: item.name, bold: true, size: 18, color: "5F5851" })],
                        }),
                      ],
                    }),
                  ),
                }),
              ],
            }),
          );
        }

        children.push(
          tableSeparator(),
          new Table({
            width: { size: 10000, type: WidthType.DXA },
            layout: TableLayoutType.FIXED,
            columnWidths: [5000, 5000],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    columnSpan: 2,
                    width: { size: 10000, type: WidthType.DXA },
                    borders: { top: border, bottom: border, left: border, right: border },
                    shading: { fill: "8B3E2F", type: ShadingType.CLEAR },
                    margins: { top: 170, bottom: 170, left: 200, right: 200 },
                    children: [
                      new Paragraph({
                        spacing: zeroSpacing,
                        children: [
                          new TextRun({
                            text: `Day${day.id}  ${selected.map((item) => item.name).join(" · ")}`,
                            bold: true,
                            size: 27,
                            color: "FFFFFF",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 5000, type: WidthType.DXA },
                    borders: { top: border, bottom: border, left: border, right: border },
                    shading: { fill: "F8F3EC", type: ShadingType.CLEAR },
                    margins: { top: 140, bottom: 140, left: 180, right: 180 },
                    children: [
                      new Paragraph({
                        spacing: zeroSpacing,
                        children: [
                          new TextRun({
                            text: `用餐：${day.meals.length ? day.meals.join("、") : "不含餐"}`,
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 5000, type: WidthType.DXA },
                    borders: { top: border, bottom: border, left: border, right: border },
                    shading: { fill: "F8F3EC", type: ShadingType.CLEAR },
                    margins: { top: 140, bottom: 140, left: 180, right: 180 },
                    children: [
                      new Paragraph({
                        spacing: zeroSpacing,
                        children: [new TextRun({ text: `住宿：${day.lodging}`, bold: true })],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    columnSpan: 2,
                    width: { size: 10000, type: WidthType.DXA },
                    borders: { top: border, bottom: border, left: border, right: border },
                    margins: { top: 90, bottom: 120, left: 200, right: 200 },
                    children: detailContent,
                  }),
                ],
              }),
            ],
          }),
        );
      });

      children.push(
        tableSeparator(),
        buildFeeTable("费用包含", feeIncluded),
        tableSeparator(),
        buildFeeTable("费用不含", feeExcluded),
      );

      const doc = new Document({
        styles: {
          default: {
            document: {
              run: { font: "Microsoft YaHei", size: 22, color: "37322E" },
              paragraph: { spacing: { line: 340, after: 100 } },
            },
          },
        },
        sections: [
          {
            properties: { page: { margin: { top: 900, right: 900, bottom: 900, left: 900 } } },
            children,
          },
        ],
      });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${tripName.trim().replace(/[\\/:*?"<>|]/g, "-")}.docx`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage("Word文档已生成");
    } catch {
      setMessage("文档生成失败，请重试");
    } finally {
      setExporting(false);
    }
  };

  return (
    <main className="trip-builder">
      <header className="topbar">
        <div className="brand-mark">行</div>
        <div>
          <strong>行程生成器</strong>
          <span>简单选择，快速成稿</span>
        </div>
        <div className="library-count">景点资料库 · {safeLibrary.length} 项{dataSource === "local" ? "（本地）" : ""}</div>
      </header>

      <section className="setup-card" aria-label="行程基本信息">
        <label className={!tripName.trim() && message ? "field-error" : ""}>
          <span>行程名称</span>
          <input value={tripName} onChange={(event) => setTripName(event.target.value)} placeholder="例如：西安华山3日游" />
        </label>
        <label>
          <span>行程天数</span>
          <select value={days.length} onChange={(event) => setDayCount(Number(event.target.value))}>
            {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>{count} 天</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="sample-button"
          onClick={() => {
            setTripName("西安华山3日游");
            setDays(initialDays);
            setMessage("");
          }}
        >
          恢复示例
        </button>
      </section>

      <section className="days-section">
        <div className="section-heading">
          <div>
            <span>每日安排</span>
            <h2>按天添加景点</h2>
          </div>
          <p>输入关键词后，请点击联想结果确认</p>
        </div>

        <div className="timeline">
          {days.map((day) => {
            const suggestions = suggestionsFor(day);
            const invalid = day.touched && (day.query.trim().length > 0 || day.items.length === 0);
            return (
              <article className="day-card" key={day.id}>
                <div className="day-index">
                  <span>DAY</span>
                  <strong>{String(day.id).padStart(2, "0")}</strong>
                </div>
                <div className="day-content">
                  <div className="route-preview">
                    {day.items.length
                      ? day.items.map((id) => routeName(itemById[id])).join("  →  ")
                      : "这一天还没有添加安排"}
                  </div>

                  <div className={`search-box ${invalid ? "field-error" : ""}`}>
                    <div className="selected-items">
                      {day.items.map((id) => (
                        <span
                          className="item-chip"
                          key={id}
                          draggable
                          onDragStart={() => { dragRef.current = { dayId: day.id, itemId: id }; }}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={() => dropItem(day, id)}
                          title="拖动可调整顺序"
                        >
                          <i aria-hidden="true">⋮⋮</i>
                          {itemById[id]?.name || id}
                          {itemById[id]?.seasonal ? <small className="seasonal-tag">{itemById[id].seasonal}</small> : null}
                          <button type="button" aria-label={`删除${itemById[id]?.name || id}`} onClick={() => removeItem(day, id)}>×</button>
                        </span>
                      ))}
                    </div>
                    <input
                      aria-label={`Day${day.id}景点关键词`}
                      value={day.query}
                      onChange={(event) => updateDay(day.id, { query: event.target.value, touched: false })}
                      onBlur={() => {
                        if (day.query.trim() || day.items.length === 0) updateDay(day.id, { touched: true });
                      }}
                      placeholder="输入景点关键词，例如：城墙、华山、接机"
                    />
                    {day.query.trim() && (
                      <div className="suggestions" role="listbox">
                        {suggestions.length ? suggestions.map((item) => (
                          <button
                            type="button"
                            key={item.id}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => addItem(day, item.id)}
                          >
                            <span>
                              {item.name}
                              <small>{item.kind}</small>
                              {item.seasonal ? <small className="seasonal-tag">{item.seasonal}</small> : null}
                            </span>
                            {item.duration && <em>{item.duration}</em>}
                          </button>
                        )) : <p>没有找到匹配项目</p>}
                      </div>
                    )}
                  </div>
                  {invalid && <p className="error-note">请从联想结果中选择景点或服务项目</p>}

                  <div className="day-options">
                    <fieldset>
                      <legend>当天含餐</legend>
                      <div className="meal-options">
                        {["早餐", "中餐", "晚餐"].map((meal) => (
                          <label key={meal}>
                            <input type="checkbox" checked={day.meals.includes(meal)} onChange={() => toggleMeal(day, meal)} />
                            <span>{meal}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <label className="lodging-select">
                      <span>当天住宿</span>
                      <select value={day.lodging} onChange={(event) => updateDay(day.id, { lodging: event.target.value })}>
                        {safeLodging.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="photo-picker">
                    <div className="photo-picker-title">
                      <strong>行程图片</strong>
                      <span>最多选择3张，统一放在当天文字最后</span>
                    </div>
                    <div className="photo-options">
                      {day.items.filter((id) => itemById[id]?.kind === "景点").length ? (
                        day.items
                          .filter((id) => itemById[id]?.kind === "景点")
                          .map((id) => {
                            const item = itemById[id];
                            const ready = Boolean(item.image) && !brokenImages[item.id];
                            return (
                              <label key={id} className={`${ready ? "photo-card" : "photo-pending"}`}>
                                {ready && item.image ? (
                                  <span className="photo-card-media">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      unoptimized
                                      sizes="(max-width: 720px) 50vw, 180px"
                                      className="object-cover"
                                      loading={PRIORITY_ATTRACTION_IMAGES.has(item.id) ? "eager" : "lazy"}
                                      priority={PRIORITY_ATTRACTION_IMAGES.has(item.id)}
                                      onError={() => setBrokenImages((current) => ({ ...current, [item.id]: true }))}
                                    />
                                  </span>
                                ) : null}
                                <span className="photo-card-meta">
                                  <input
                                    type="checkbox"
                                    checked={day.photoItems.includes(id)}
                                    disabled={!ready || (!day.photoItems.includes(id) && day.photoItems.length >= 3)}
                                    onChange={() => togglePhoto(day, id)}
                                  />
                                  <span>{item.name}</span>
                                  {item.seasonal ? <small className="seasonal-tag">{item.seasonal}</small> : null}
                                  {!ready && <small>图片待补</small>}
                                </span>
                              </label>
                            );
                          })
                      ) : (
                        <p>当天没有需要配图的景区</p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="fee-section" aria-label="费用说明">
        <label className="fee-box">
          <span>费用包含</span>
          <textarea
            value={feeIncluded}
            onChange={(event) => setFeeIncluded(event.target.value)}
            placeholder="请输入交通、住宿、门票、用餐、导游等包含项目，每行一项"
            rows={5}
          />
        </label>
        <label className="fee-box">
          <span>费用不含</span>
          <textarea
            value={feeExcluded}
            onChange={(event) => setFeeExcluded(event.target.value)}
            placeholder="请输入单房差、个人消费、自费项目等不包含项目，每行一项"
            rows={5}
          />
        </label>
      </section>

      <footer className="action-bar">
        <div>
          <strong>{tripName || "未命名行程"}</strong>
          <span>{days.length} 天 · 共 {days.reduce((sum, day) => sum + day.items.length, 0)} 个项目</span>
        </div>
        {message && <p className={message.includes("已生成") ? "success-message" : "status-message"}>{message}</p>}
        <button type="button" onClick={exportDocx} disabled={exporting}>
          {exporting ? "正在生成…" : "生成 Word 文档"}
        </button>
      </footer>
    </main>
  );
}

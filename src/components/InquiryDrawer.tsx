import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, Plus, Minus, Trash2, ClipboardList, CheckCircle2, ArrowLeft } from 'lucide-react';
import { InquiryItem, InquiryReceipt } from '../types';
import { ResilientImage } from './ResilientImage';

interface InquiryDrawerProps {
  isOpen: boolean;
  items: InquiryItem[];
  onClose: () => void;
  onUpdateQty: (inquiryKey: string, delta: number) => void;
  onRemoveItem: (inquiryKey: string) => void;
  onClearItems: () => void;
}

export function InquiryDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearItems,
}: InquiryDrawerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState<'list' | 'form' | 'confirmed'>('list');
  const [receipt, setReceipt] = useState<InquiryReceipt | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [orderType, setOrderType] = useState<'single' | 'gift' | 'boutique'>('single');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (items.length > 0 && step === 'confirmed') {
      setStep('list');
    }
  }, [items.length, step]);

  const totalPieces = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !city.trim() || !address.trim()) {
      setFormError('Please fill in your name, phone/WhatsApp, city, and delivery address.');
      return;
    }
    setFormError('');
    const refId = `CCE-${Math.floor(1000 + Math.random() * 9000)}`;
    setReceipt({
      referenceId: refId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      city: city.trim(),
      address: address.trim(),
      orderType,
      notes: notes.trim() || undefined,
      items: [...items],
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    });
    onClearItems();
    setStep('confirmed');
  };

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('list');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Inquiry Bag"
          className="fixed inset-0 z-50 flex justify-end"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseDrawer}
            className="fixed inset-0 bg-[#362426]/40 backdrop-blur-xs"
          />

          <motion.aside
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-[460px] flex-col border-l-2 border-dashed border-[#D8A7B5] bg-[#FFFDF9] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#9D4463]/15 px-6 py-5">
              <div className="flex items-center gap-2.5">
                {step === 'form' && (
                  <button
                    type="button"
                    onClick={() => setStep('list')}
                    aria-label="Back to inquiry bag"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#9D4463]/20 text-[#362426] hover:bg-[#FCECF0] cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <h2 className="font-display text-xl font-semibold text-[#362426]">
                  {step === 'list' && 'Your Inquiry Bag'}
                  {step === 'form' && 'Request Studio Quote'}
                  {step === 'confirmed' && 'Inquiry Submitted'}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCloseDrawer}
                aria-label="Close inquiry drawer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FCECF0] text-[#362426] hover:bg-[#F7DCE3] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {step === 'confirmed' && receipt ? (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-[#3C6E47]/25 bg-[#EDF5EE] p-5">
                    <div className="flex items-center gap-2.5 text-[#3C6E47]">
                      <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <span className="text-sm font-semibold">
                        Reference #{receipt.referenceId} Received
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#4B584E]">
                      Thank you, {receipt.customerName}. Our studio team will message{' '}
                      <span className="font-semibold text-[#362426]">{receipt.phone}</span> on
                      WhatsApp with pricing, yarn availability, and delivery timeline.
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t border-[#9D4463]/15 pt-4 text-sm text-[#644F52]">
                    <p className="text-xs font-semibold tracking-wider text-[#9D4463] uppercase">
                      Inquiry Summary · {receipt.submittedAt}
                    </p>
                    <p>
                      Delivery City: {receipt.address}, {receipt.city}
                    </p>
                    <p>
                      Order Type:{' '}
                      {receipt.orderType === 'single'
                        ? 'Single Keepsake Order'
                        : receipt.orderType === 'gift'
                        ? 'Heirloom Gift Box'
                        : 'Boutique / Multi-Piece Batch'}
                    </p>
                    {receipt.notes && <p>Notes: {receipt.notes}</p>}
                  </div>

                  <ul className="divide-y divide-[#9D4463]/12 border-t border-b border-[#9D4463]/12">
                    {receipt.items.map((item) => (
                      <li key={item.inquiryKey} className="py-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[#362426]">
                            {item.sku} · {item.name}
                          </span>
                          <span className="font-semibold text-[#9D4463] tabular-nums">
                            Qty {item.quantity}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-[#715B5E]">
                          Size {item.size}
                          {item.customPalette ? ` · ${item.customPalette}` : ''}
                          {item.customEmbroidery ? ` · Embroidery: "${item.customEmbroidery}"` : ''}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <ClipboardList className="h-10 w-10 text-[#9D4463]" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-xl font-medium text-[#362426]">
                    Your inquiry bag is empty
                  </h3>
                  <p className="mt-2 max-w-[32ch] text-sm text-[#644F52]">
                    Add any baby frock, cardigan, blanket, or embroidery keepsake to request
                    sizing and direct studio quotes.
                  </p>
                  <button
                    type="button"
                    onClick={handleCloseDrawer}
                    className="mt-6 min-h-[42px] rounded-full bg-[#9D4463] px-5 py-2 text-sm font-semibold text-white hover:bg-[#843651] cursor-pointer"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : step === 'list' ? (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-dashed border-[#9D4463]/25 bg-[#FCECF0]/70 p-4">
                    <p className="text-xs leading-relaxed text-[#5A4246]">
                      Studio rates are shared directly per order based on baby size, pastel yarn
                      selection, and personalized embroidery details.
                    </p>
                  </div>

                  <ul className="divide-y divide-[#9D4463]/12">
                    {items.map((item) => (
                      <li key={item.inquiryKey} className="flex gap-4 py-4">
                        <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-black/8 bg-[#FCECF0]">
                          <ResilientImage
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[11px] font-semibold text-[#9D4463]">{item.sku}</p>
                              <h3 className="font-display text-base font-medium text-[#362426]">
                                {item.name}
                              </h3>
                              <p className="mt-0.5 text-xs text-[#715B5E]">
                                Size {item.size}
                                {item.customPalette ? ` · ${item.customPalette}` : ''}
                              </p>
                              {item.customEmbroidery && (
                                <p className="mt-0.5 text-xs font-medium text-[#9D4463]">
                                  Embroidery: &ldquo;{item.customEmbroidery}&rdquo;
                                </p>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.inquiryKey)}
                              aria-label={`Remove ${item.name}`}
                              className="p-1.5 text-[#8E7A7E] transition-colors hover:text-[#9D4463] cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center rounded-lg border border-[#9D4463]/20 bg-white">
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.inquiryKey, -1)}
                                aria-label="Decrease quantity"
                                className="inline-flex h-8 w-8 items-center justify-center text-[#362426] hover:bg-[#FCECF0] cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-semibold text-[#362426] tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.inquiryKey, 1)}
                                aria-label="Increase quantity"
                                className="inline-flex h-8 w-8 items-center justify-center text-[#362426] hover:bg-[#FCECF0] cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <span className="text-xs font-medium text-[#715B5E]">
                              Quote on request
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <form id="inquiry-form" onSubmit={handleSubmitInquiry} className="space-y-4">
                  {formError && (
                    <p
                      role="alert"
                      className="rounded-xl border border-[#9D4463]/35 bg-[#FCECF0] px-3.5 py-2.5 text-xs font-medium text-[#9D4463]"
                    >
                      {formError}
                    </p>
                  )}

                  <div>
                    <label htmlFor="inq-name" className="text-xs font-semibold text-[#362426]">
                      Full Name
                    </label>
                    <input
                      id="inq-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Sana Tariq"
                      className="mt-1.5 min-h-[42px] w-full rounded-xl border border-[#9D4463]/20 bg-white px-3.5 text-sm text-[#362426] placeholder:text-[#A38E92] focus:border-[#9D4463] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="inq-phone" className="text-xs font-semibold text-[#362426]">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      id="inq-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="mt-1.5 min-h-[42px] w-full rounded-xl border border-[#9D4463]/20 bg-white px-3.5 text-sm text-[#362426] placeholder:text-[#A38E92] focus:border-[#9D4463] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="inq-city" className="text-xs font-semibold text-[#362426]">
                        City / Country
                      </label>
                      <input
                        id="inq-city"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Lahore / Dubai / London"
                        className="mt-1.5 min-h-[42px] w-full rounded-xl border border-[#9D4463]/20 bg-white px-3.5 text-sm text-[#362426] placeholder:text-[#A38E92] focus:border-[#9D4463] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="inq-type" className="text-xs font-semibold text-[#362426]">
                        Order Type
                      </label>
                      <select
                        id="inq-type"
                        value={orderType}
                        onChange={(e) =>
                          setOrderType(e.target.value as 'single' | 'gift' | 'boutique')
                        }
                        className="mt-1.5 min-h-[42px] w-full rounded-xl border border-[#9D4463]/20 bg-white px-3 text-sm text-[#362426] focus:border-[#9D4463] focus:outline-none cursor-pointer"
                      >
                        <option value="single">Single Set Order</option>
                        <option value="gift">Gift Box Packaging</option>
                        <option value="boutique">Boutique / Bulk Batch</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inq-addr" className="text-xs font-semibold text-[#362426]">
                      Delivery Street Address
                    </label>
                    <input
                      id="inq-addr"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House / Street / Sector"
                      className="mt-1.5 min-h-[42px] w-full rounded-xl border border-[#9D4463]/20 bg-white px-3.5 text-sm text-[#362426] placeholder:text-[#A38E92] focus:border-[#9D4463] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="inq-notes" className="text-xs font-semibold text-[#362426]">
                      Custom Color / Date Notes (Optional)
                    </label>
                    <textarea
                      id="inq-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Event date, custom measurements, or pastel yarn requests..."
                      className="mt-1.5 w-full rounded-xl border border-[#9D4463]/20 bg-white p-3 text-sm text-[#362426] placeholder:text-[#A38E92] focus:border-[#9D4463] focus:outline-none"
                    />
                  </div>
                </form>
              )}
            </div>

            {/* Footer CTA */}
            {items.length > 0 && step !== 'confirmed' && (
              <div className="border-t border-[#9D4463]/15 bg-[#FCECF0]/60 px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#644F52]">Selected Pieces</span>
                  <span className="font-semibold text-[#362426] tabular-nums">
                    {totalPieces} {totalPieces === 1 ? 'Item' : 'Items'} · Quote Ready
                  </span>
                </div>

                {step === 'list' ? (
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="mt-4 min-h-[46px] w-full rounded-full bg-[#9D4463] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#843651] cursor-pointer"
                  >
                    Continue to Quote Request
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="inquiry-form"
                    className="mt-4 min-h-[46px] w-full rounded-full bg-[#9D4463] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#843651] cursor-pointer"
                  >
                    Submit Inquiry ({totalPieces} {totalPieces === 1 ? 'Piece' : 'Pieces'})
                  </button>
                )}
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

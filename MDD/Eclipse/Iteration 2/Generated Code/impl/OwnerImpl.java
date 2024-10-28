/**
 */
package com.garagu.emf.fillthevoid.model.FillTheVoid.impl;

import com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage;
import com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery;
import com.garagu.emf.fillthevoid.model.FillTheVoid.Owner;
import com.garagu.emf.fillthevoid.model.FillTheVoid.Painting;

import java.util.Collection;

import org.eclipse.emf.common.notify.NotificationChain;

import org.eclipse.emf.common.util.EList;

import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.InternalEObject;

import org.eclipse.emf.ecore.util.EObjectContainmentEList;
import org.eclipse.emf.ecore.util.InternalEList;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Owner</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.OwnerImpl#getPainting <em>Painting</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.OwnerImpl#getGallery <em>Gallery</em>}</li>
 * </ul>
 *
 * @generated
 */
public class OwnerImpl extends UserImpl implements Owner {
	/**
	 * The cached value of the '{@link #getPainting() <em>Painting</em>}' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getPainting()
	 * @generated
	 * @ordered
	 */
	protected EList<Painting> painting;

	/**
	 * The cached value of the '{@link #getGallery() <em>Gallery</em>}' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getGallery()
	 * @generated
	 * @ordered
	 */
	protected EList<Gallery> gallery;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected OwnerImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return FillTheVoidPackage.Literals.OWNER;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EList<Painting> getPainting() {
		if (painting == null) {
			painting = new EObjectContainmentEList<Painting>(Painting.class, this, FillTheVoidPackage.OWNER__PAINTING);
		}
		return painting;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EList<Gallery> getGallery() {
		if (gallery == null) {
			gallery = new EObjectContainmentEList<Gallery>(Gallery.class, this, FillTheVoidPackage.OWNER__GALLERY);
		}
		return gallery;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
		case FillTheVoidPackage.OWNER__PAINTING:
			return ((InternalEList<?>) getPainting()).basicRemove(otherEnd, msgs);
		case FillTheVoidPackage.OWNER__GALLERY:
			return ((InternalEList<?>) getGallery()).basicRemove(otherEnd, msgs);
		}
		return super.eInverseRemove(otherEnd, featureID, msgs);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
		case FillTheVoidPackage.OWNER__PAINTING:
			return getPainting();
		case FillTheVoidPackage.OWNER__GALLERY:
			return getGallery();
		}
		return super.eGet(featureID, resolve, coreType);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("unchecked")
	@Override
	public void eSet(int featureID, Object newValue) {
		switch (featureID) {
		case FillTheVoidPackage.OWNER__PAINTING:
			getPainting().clear();
			getPainting().addAll((Collection<? extends Painting>) newValue);
			return;
		case FillTheVoidPackage.OWNER__GALLERY:
			getGallery().clear();
			getGallery().addAll((Collection<? extends Gallery>) newValue);
			return;
		}
		super.eSet(featureID, newValue);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void eUnset(int featureID) {
		switch (featureID) {
		case FillTheVoidPackage.OWNER__PAINTING:
			getPainting().clear();
			return;
		case FillTheVoidPackage.OWNER__GALLERY:
			getGallery().clear();
			return;
		}
		super.eUnset(featureID);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public boolean eIsSet(int featureID) {
		switch (featureID) {
		case FillTheVoidPackage.OWNER__PAINTING:
			return painting != null && !painting.isEmpty();
		case FillTheVoidPackage.OWNER__GALLERY:
			return gallery != null && !gallery.isEmpty();
		}
		return super.eIsSet(featureID);
	}

} //OwnerImpl
